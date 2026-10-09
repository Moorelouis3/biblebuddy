export type MarkElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkElevenRawNotes(rawText: string): MarkElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 11:${startVerse}` : `Mark 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Mark 11 sections, received " + sections.length);
  }

  return sections;
}

const MARK_ELEVEN_RAW_NOTES = `# Mark 11:1-6
# 🐴 Go Get Me A Colt
---
## 🗺️ Bethphage And Bethany, At The Mount Of Olives

Bethphage and Bethany were two small villages just outside Jerusalem.

Both sat on the eastern slope of the Mount of Olives.

From there, pilgrims could look straight across the valley at the city walls.

Jesus starts this final approach from a spot every pilgrim would know well.

🗺️ Bethphage and Bethany sat near Jerusalem

⛰️ Both rested on the Mount of Olives

👀 Jerusalem was visible just across the valley

📖 His last approach begins from familiar ground

## 🤝 He Sendeth Forth Two Of His Disciples

Sending two people instead of one followed a pattern Jesus used often.

Jewish law normally required at least two witnesses to confirm a claim.

Two disciples could also back up each other if anyone questioned what happened.

This detail was not random.

It was built for credibility.

🤝 Sending two followed Jesus's usual pattern

⚖️ Jewish law leaned on two witnesses

✅ Two disciples could confirm one story

📖 The number was chosen on purpose

## 🐴 A Colt Tied, Whereon Never Man Sat

"Whereon never man sat" means the colt had never been ridden before.

An untrained animal like that would normally resist and buck under a new rider.

Jesus already knew it would carry him calmly instead.

Centuries earlier, the prophet Zechariah pictured Israel's promised king arriving on exactly this kind of colt.

A small, ordinary detail is quietly fulfilling an old promise.

🐴 Never sat on means never ridden

😮 Untrained colts usually resist a new rider

📜 Zechariah pictured this same kind of king

📖 A small detail fulfills an old promise

## 👑 The Lord Hath Need Of Him

Jesus tells his disciples exactly what to say before anyone even asks a question.

He already knows the colt is there.

He already knows the owner will let it go.

Calling himself "the Lord" here is a clear, confident claim about who he is.

Nothing in this moment is left to chance.

🔮 Jesus names the colt before seeing it

🙋 He predicts the owner's exact response

👑 Lord here is a claim about himself

📖 Nothing here is left to chance

## ⏩ Straightway He Will Send Him Hither

"Straightway" is an old word simply meaning immediately, without delay.

"Hither" means to this place, right here.

Jesus promises the owner will release the colt the moment he hears the right words.

That promise comes true exactly as he said it.

⏩ Straightway means immediately

📍 Hither means to this place

✅ The owner releases it right away

➡️ It happens exactly as Jesus said

## 🚪 Tied By The Door Without In A Place Where Two Ways Met

"The door without" means outside, at the door facing the street.

A spot where two roads crossed was a busy, visible location.

The colt was not hidden away.

Anyone passing by could see it in plain sight.

This small detail reads like someone remembering the exact scene.

🚪 Door without means outside, facing the street

🛣️ Two ways met describes a crossroads

👀 The colt sat in plain view

📖 This reads like an eyewitness memory

## ❓ What Do Ye, Loosing The Colt?

Bystanders challenge the two disciples the moment they start untying the animal.

Taking someone else's animal without asking would normally cause real trouble.

The disciples have nothing to offer but the exact words Jesus gave them.

Somehow, that answer turns out to be enough.

❓ Bystanders challenge them right away

🚨 Taking an animal unasked invites trouble

🗣️ They have only Jesus's own words

➡️ Trust rests on what he said

## ✅ They Let Them Go

The bystanders accept the answer and release the colt without further argument.

Jesus's instructions worked exactly as he said they would.

A stranger's willingness to let it go was part of the plan from the start.

Small details like this show how closely Mark remembers this day.

✅ The explanation satisfied the bystanders

🎯 Jesus's instructions worked exactly as planned

🤝 A stranger's cooperation was part of the plan

📖 Mark remembers this day in close detail

# Mark 11:7-11
# 👑 The King Enters Jerusalem
---
## 🧥 Cast Their Garments On Him

Throwing a cloak down for a king to walk or ride over was a sign of honor.

Centuries earlier, people did the same thing for the newly crowned king Jehu.

The disciples treat this borrowed colt like a royal mount.

Jesus accepts the honor without ever asking for it.

🧥 Garments thrown down honored a king

👑 The same thing happened for King Jehu

🐴 A borrowed colt becomes a royal mount

📖 Jesus accepts the honor offered to him

## 🧥 Spread Their Garments In The Way

Many people in the crowd threw their own cloaks onto the road ahead of Jesus.

This turned the ordinary road into a kind of royal carpet.

People gave up their own clothing for a moment of celebration.

Nobody organized this moment.

The crowd acted together on its own.

🧥 Cloaks covered the road like a carpet

🛣️ An ordinary road became a royal path

👐 People gave up their own clothing

📖 This honor was spontaneous, not staged

## 🌿 Cut Down Branches Off The Trees, And Strawed Them In The Way

Others ran ahead and cut leafy branches straight off nearby trees.

They scattered the branches across the road the same way they scattered their cloaks.

John's Gospel specifically calls these palm branches.

Palm branches were already linked with celebrating victory and welcoming a king.

This was a crowd treating Jesus like the triumphant king they had been waiting for.

🌿 Branches were cut and scattered on the road

🌴 John's Gospel names these as palm branches

🏆 Palms already stood for victory and kingship

📖 The crowd welcomed him as their king

## 🙌 Hosanna

"Hosanna" was originally a Hebrew cry meaning save now, or save us.

By this time, it had become a shout of praise and welcome at festivals.

The crowd is not just cheering.

They are calling out for rescue.

They are asking God to save them through the very person riding past.

🙌 Hosanna originally meant save now

🎉 It had become a festival shout of praise

🆘 The cry carried a real plea for rescue

📖 They ask God to save them through him

## 📜 Blessed Is He That Cometh In The Name Of The Lord

This line comes straight from Psalm one hundred eighteen.

Jewish pilgrims sang this exact psalm every year on their way into Jerusalem for Passover.

The crowd is not inventing new words.

They are quoting a familiar song.

By shouting it at Jesus, they name him as the one that psalm was pointing toward.

📜 This line quotes Psalm one hundred eighteen

🚶 Pilgrims sang it every Passover journey

🎶 The crowd quotes a familiar song

📖 They name Jesus as its true subject

## 👑 Blessed Be The Kingdom Of Our Father David

The crowd is not just praising Jesus personally.

They are celebrating the return of David's kingdom, long promised and long awaited.

Many expected a political and military restoration, not a spiritual one.

They want a king like David, strong and victorious right now.

What they are hoping for and what Jesus actually came to do will not match.

👑 They celebrate David's promised kingdom

⚔️ Many expected political, military restoration

🤔 They pictured strength and victory now

📖 Their hope and Jesus's mission will not match

## 👀 When He Had Looked Round About Upon All Things

Jesus walks through the temple and takes in everything he sees.

He is not simply sightseeing.

He is evaluating what the temple has become.

Mark places this quiet, watchful moment right before tomorrow's confrontation.

What he sees today, he will act on tomorrow.

👀 Jesus takes in everything he sees

🔍 He is evaluating, not sightseeing

⏳ This moment sits right before tomorrow's action

➡️ What he sees today, he acts on tomorrow

## 🌆 He Went Out Unto Bethany With The Twelve

Jesus does not stay inside Jerusalem overnight.

He walks back out to Bethany each evening with his closest followers.

This daily pattern repeats through the final days of this week.

Jerusalem is where he teaches and confronts.

Bethany is where he rests.

🌆 Jesus leaves Jerusalem each night

🚶 He returns to Bethany with the twelve

🔁 This pattern repeats all week

📖 Jerusalem for conflict, Bethany for rest

# Mark 11:12-14
# 🌳 He Cursed The Fig Tree
---
## 🍃 He Came, If Haply He Might Find Any Thing Thereon

"If haply" is an old way of saying if perhaps, or on the chance that.

Fig trees normally grow their fruit at the same time as their leaves, or even before.

A tree already covered in leaves should reasonably have had some early fruit on it.

Jesus is not acting unreasonably by checking.

🍃 If haply means on the chance that

🌳 Leaves usually came with or before fruit

🤔 Checking this tree was a reasonable move

➡️ The leaves raised a fair expectation

## 📆 The Time Of Figs Was Not Yet

This detail sounds like it makes the curse unfair.

Fig trees in this region sometimes grew small, edible early buds before the main season.

Those early buds showed up alongside the first leaves, long before the regular harvest.

A tree in full leaf with no early buds at all was genuinely failing to produce.

The problem was not timing.

It was emptiness.

📆 The main fig season had not arrived

🌱 Early buds should still have appeared

🌳 This tree had leaves but no fruit

📖 The failure was emptiness, not timing

## 🚫 No Man Eat Fruit Of Thee Hereafter For Ever

Jesus speaks directly to the tree as if it could hear him.

This was never really about one unlucky fig tree.

Prophets often used an acted out sign, a real action that pictured a bigger truth.

The temple itself was about to receive the same kind of verdict this tree just received.

An unfruitful tree becomes a living picture of an unfruitful temple.

🗣️ Jesus speaks directly to the tree

🎭 This acts out a bigger truth

🏛️ The temple faces the same verdict

📖 An empty tree pictures an empty temple

## 👂 His Disciples Heard It

Mark adds this small detail on purpose.

The disciples do not react to it yet.

Mark is quietly setting up a moment that pays off eight verses later.

Small details like this show how carefully this Gospel was put together.

👂 The disciples heard the curse spoken

⏳ No reaction happens yet

🔗 This sets up a later moment

📖 Mark builds his story with care

# Mark 11:15-19
# 🏛️ A House Of Prayer, Not A Den Of Thieves
---
## 🏛️ Them That Sold And Bought In The Temple

This marketplace sat in the Court of the Gentiles, the only temple area open to non Jews.

Worshippers needed animals for sacrifice, and buying one there saved a long journey.

What started as a convenience had grown into a loud, commercial marketplace.

It filled the one space set aside for outsiders to seek God.

🏛️ This sat in the Court of the Gentiles

🐑 People bought sacrifice animals there

📈 A convenience grew into a marketplace

📖 It crowded out the one space for outsiders

## 💱 Overthrew The Tables Of The Moneychangers

Roman coins carried images of the emperor, considered idolatrous for temple use.

Worshippers had to exchange that money for approved temple coinage before paying the required tax.

Moneychangers charged a fee for this exchange, every single time.

Jesus does not quietly object.

He physically turns the tables over.

💱 Roman coins were unfit for temple use

🔄 Worshippers had to exchange their money

💵 Moneychangers charged a fee every time

➡️ Jesus acts instead of just protesting

## 🕊️ The Seats Of Them That Sold Doves

Doves were the sacrifice specifically allowed for the poor who could not afford a lamb.

Selling doves here should have been a mercy for people with little money.

Instead, sellers likely charged inflated prices to a captive crowd with nowhere else to go.

Jesus overturns the seats built on exploiting the poorest worshippers.

🕊️ Doves were the sacrifice for the poor

💸 This should have shown mercy, not profit

🚫 Sellers likely overcharged a captive crowd

📖 Jesus defends the poorest worshippers here

## 🚶 Carry Any Vessel Through The Temple

Some people were using the outer temple court as a shortcut between neighborhoods.

Carrying ordinary goods or containers through it treated the holy space like an alley.

Jesus stops this, not just the selling.

He restores basic respect for where people were standing.

🚶 People used the court as a shortcut

📦 Carrying goods through it ignored its purpose

🛑 Jesus stops this, not only the selling

➡️ He restores basic respect for the space

## 🌍 My House Shall Be Called Of All Nations The House Of Prayer

Jesus quotes the prophet Isaiah directly.

The phrase "all nations" is not an afterthought.

It is the whole point.

The Court of the Gentiles was the one place non Jews could come pray.

That is the exact space the marketplace had taken over.

📜 Jesus quotes the prophet Isaiah

🌍 All nations was the whole point

🙏 Gentiles could only pray in this court

📖 The marketplace took over their one space

## 🗝️ Ye Have Made It A Den Of Thieves

Jesus also quotes the prophet Jeremiah here.

A den of thieves is not just a place where theft happens.

It is a hideout where wrongdoers feel safe after the crime is done.

The temple had become a safe retreat for dishonest profit, not a house of worship.

📜 Jesus also quotes the prophet Jeremiah

🏠 A den of thieves means a hideout

💰 It sheltered dishonest profit, not worship

📖 Jesus names exactly what it had become

## ⚖️ Sought How They Might Destroy Him

The chief priests and scribes do not repent after hearing this.

They start planning how to get rid of him instead.

Fear plays a role too.

The crowd was genuinely amazed at his teaching.

That amazement threatened the leaders even more.

By evening, Jesus quietly leaves the city again.

⚖️ Leaders plan his death, not repentance

😨 Fear mixes with their anger

👏 The crowd's amazement threatens them more

📖 Jesus leaves the city by evening

# Mark 11:20-26
# 🙏 Have Faith In God
---
## 🥀 Dried Up From The Roots

The curse Jesus spoke the day before has now fully taken effect.

"From the roots" means the whole tree died, not just its leaves or branches.

This is not a slow decline.

It is a complete and visible end.

The fig tree becomes a finished picture of the judgment Jesus pronounced on the temple.

🥀 The curse from yesterday is now complete

🌳 From the roots means the whole tree died

⚡ This death was sudden, not gradual

📖 The tree completes the temple's picture

## 🙋 Peter Calling To Remembrance

"Calling to remembrance" means Peter suddenly remembers what Jesus said the day before.

He had apparently not connected the words to anything serious at the time.

Now, seeing the dead tree, the memory comes back with new weight.

Peter brings it up with clear surprise in his voice.

🙋 Calling to remembrance means suddenly recalling

😮 Peter did not expect this result

🥀 Seeing the dead tree jogs his memory

📖 He brings it up in surprise

## 🙏 Have Faith In God

Jesus does not stop to explain the fig tree any further.

He turns Peter's surprise into a lesson about trusting God completely.

The dead tree becomes the starting point for a much bigger teaching.

What happened to a tree is about to become a lesson about mountains and prayer.

🙏 Jesus pivots straight to a lesson

🌳 The tree becomes a starting point

📚 A small event teaches a bigger truth

➡️ Mountains and prayer come next

## ⛰️ Say Unto This Mountain, Be Thou Removed, And Be Thou Cast Into The Sea

Jesus and his disciples are standing near the Mount of Olives when he says this.

Many Bible scholars connect this to the temple mount itself, visible from where they stood.

Throwing a mountain into the sea was a common way to describe something impossible.

Jesus may also be hinting that the temple's whole system is about to be removed.

⛰️ They stood near the Mount of Olives

🏛️ Many connect this to the temple mount

🌊 Mountain into the sea meant the impossible

📖 The temple system may be what is removed

## 💭 Shall Not Doubt In His Heart, But Shall Believe

This is not a promise that strong enough feelings make things happen.

"Doubt in his heart" means a settled, inward refusal to trust God's power.

"Believe" here means a steady, decided trust, not an emotional high.

Jesus is describing a settled confidence, not an intensity of feeling.

💭 Doubt here means inward refusal to trust

🧭 Belief means settled trust, not emotion

🚫 This is not about feeling strongly enough

📖 Steady trust, not emotional intensity

## 🙏 What Things Soever Ye Desire, When Ye Pray, Believe That Ye Receive Them

This line is not a blank check for any personal wish.

Jesus has just finished judging a temple system built on self interest and profit.

Prayer offered with real trust lines up with what God is already doing.

It does not exist to override God's purposes for private gain.

🙏 Not a blank check for any wish

🏛️ This follows right after judging the temple

🧭 Real prayer lines up with God's purposes

➡️ Not a tool for private gain

## 🤝 If Ye Have Ought Against Any

"Ought" is an old word simply meaning anything at all.

Jesus connects effective prayer directly to forgiving other people.

Holding onto a grudge while asking God for things is treated as a contradiction.

Prayer and forgiveness are tied together, not kept in separate rooms.

🤝 Ought means anything at all

🙏 Prayer gets tied to forgiveness

🚫 Holding a grudge contradicts that request

📖 Prayer and forgiveness share one room

## 👨‍👧 Your Father Also Which Is In Heaven May Forgive You Your Trespasses

Jesus calls God "Father" here, a close and personal title.

"Trespasses" means the wrongs a person has committed against God.

Forgiving others becomes directly tied to receiving that same forgiveness from God.

The relationship works in both directions at once.

👨‍👧 Father is a close, personal title

⚖️ Trespasses means wrongs committed against God

🔄 Giving and receiving forgiveness are tied together

📖 The relationship runs in both directions

## ⚠️ Neither Will Your Father Which Is In Heaven Forgive Your Trespasses

Jesus states the warning plainly, without softening it.

Refusing to forgive someone else blocks a person's own forgiveness from God.

This is not a minor side note.

Jesus repeats it as its own full sentence on purpose.

The weight of forgiveness runs through this entire closing teaching.

⚠️ Jesus states this warning plainly

🔒 Refusing to forgive blocks your own forgiveness

🔁 He repeats it as its own sentence

📖 Forgiveness carries real weight here

# Mark 11:27-33
# ❓ By What Authority?
---
## 👥 The Chief Priests, And The Scribes, And The Elders

These three groups together formed the ruling council in Jerusalem, later known as the Sanhedrin.

Chief priests ran temple operations, scribes interpreted the law, and elders represented leading families.

This is the same leadership that started plotting against Jesus back in verse eighteen.

Now they confront him face to face instead of only talking behind his back.

👥 These three groups formed Jerusalem's ruling council

🏛️ Chief priests, scribes, and elders had separate roles

🔁 The same leaders plotted against him earlier

📖 Now they confront him in person

## ❓ By What Authority Doest Thou These Things?

"These things" points back to clearing the temple and entering the city like a king.

Rabbis normally trained for years under a recognized teacher before claiming authority to teach.

Jesus had no such formal credential that these leaders would recognize.

Their question is really asking who gave him the right to act this way.

❓ These things means the temple and the entry

📜 Rabbis usually trained under a recognized teacher

🚫 Jesus had no credential they recognized

📖 They are asking who gave him the right

## 🔄 I Will Also Ask Of You One Question

Jesus answers a hard question with a counter question of his own.

This was a common and respected teaching method among Jewish rabbis.

He is not dodging the question.

He is setting a trap of his own.

Whatever they answer will reveal more than they want to show.

🔄 Jesus answers with a counter question

📜 This method was common among rabbis

🪤 He sets a trap of his own

➡️ Their answer will reveal too much

## 🌊 The Baptism Of John, Was It From Heaven, Or Of Men?

John's baptism and ministry pointed directly toward Jesus as the one to come.

If the leaders admit John came from heaven, they must also explain why they rejected Jesus.

This single question ties John's authority and Jesus's authority tightly together.

There is no safe answer waiting for them here.

🌊 John's ministry pointed straight to Jesus

🔗 John's authority and Jesus's authority are linked

🚫 No safe answer exists for them

📖 One question exposes their whole problem

## 🤐 Why Then Did Ye Not Believe Him?

Saying John came from heaven forces an uncomfortable follow up question.

If John truly spoke for God, rejecting his message was rejecting God himself.

That same John had already pointed directly to Jesus during his ministry.

Admitting the first part makes the second part impossible to escape.

🤐 Admitting John came from heaven backfires

🙅 Rejecting John meant rejecting God's own message

👉 John had already pointed to Jesus

📖 One admission traps the next

## 😨 They Feared The People

These leaders are not weighing truth here.

They are weighing public opinion instead.

John remained hugely popular with ordinary people, even after his death.

Publicly denying John's authority risked turning the crowd against these leaders instead of against Jesus.

😨 They weigh opinion, not truth

👥 John stayed popular with ordinary people

🔄 Denying John could turn the crowd on them

📖 Fear of people replaces fear of God

## 📣 All Men Counted John, That He Was A Prophet

"Counted" here means the people genuinely believed and recognized this about him.

John was not a controversial or marginal figure to ordinary Jewish people.

Nearly everyone agreed that John had spoken for God.

That near universal agreement is exactly what trapped these leaders in their own question.

📣 Counted means genuinely believed and recognized

👍 John was widely accepted as genuine

🤝 Almost everyone agreed on this point

📖 Their own trap was public agreement

## 🤷 We Cannot Tell

This answer is not honest confusion.

These leaders know exactly what they believe about John.

They refuse to say it out loud because either answer costs them something.

Choosing silence over truth protects their position instead of answering the actual question.

🤷 This is not real confusion

🧠 They know what they actually believe

🔒 Either honest answer costs them something

📖 Silence protects position, not truth

## 🚪 Neither Do I Tell You By What Authority I Do These Things

Jesus will not reward their dishonesty with a straight answer.

Their refusal to engage honestly closes the door on this conversation.

He does not owe an explanation to people unwilling to answer their own question first.

This exchange ends in a standoff, with nothing resolved on the surface.

🚪 Jesus closes the door on this exchange

⚖️ Their dishonesty earns no straight answer

🤷 He owes nothing to a closed question

➡️ The standoff ends with nothing resolved
`.trim();

export const MARK_ELEVEN_PERSONAL_SECTIONS = parseMarkElevenRawNotes(MARK_ELEVEN_RAW_NOTES);
