export type SecondPeterTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondPeterTwoRawNotes(rawText: string): SecondPeterTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondPeterTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondPeter\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Peter 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondPeter\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondPeter\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Peter 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Peter 2:${startVerse}` : `2 Peter 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Second Peter 2 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_PETER_TWO_RAW_NOTES = `# SecondPeter 2:1-3
# ⚠️ Counterfeits Rise Up
---
## 🔮 False Prophets Also Among The People

False prophets were people in Israel who claimed to speak for God but did not.

Peter just spent chapter one defending true prophecy as trustworthy.

Now he turns to describe its exact opposite.

Scripture always warned that counterfeits would rise alongside the real thing.

🔮 False prophets claimed a message not from God
📚 Chapter one just defended true prophecy
🔄 This verse turns to the opposite
📖 Counterfeits always rose alongside the real thing

## 🧑‍🏫 False Teachers Among You

"Teachers" moves the danger from Israel's old history into Peter's own churches.

The same pattern that corrupted Israel is about to repeat itself.

This time the false voice rises from inside the Christian community.

The threat is no longer distant.

It is already present.

🧑‍🏫 Teachers rise from inside the church
🔁 The same old pattern repeats
📍 Israel's danger now reaches Peter's readers
📖 The threat is already present

## 🕵️ Privily Shall Bring In Damnable Heresies

"Privily" means secretly, without announcing themselves.

"Heresies" means teachings that divide believers and pull them from the truth.

These false teachers never arrive labeled as dangerous.

They work quietly, mixed in with teaching that still sounds familiar.

🕵️ Privily means entering secretly
💣 Heresies means divisive, destructive teaching
🏷️ Danger never arrives already labeled
📖 It hides inside familiar sounding teaching

## 💰 Denying The Lord That Bought Them

"Bought" pictures a slave purchased out of slavery into freedom.

Christ paid that price for these very teachers with His own blood.

Denying Him is not just holding a wrong opinion.

It is turning on the one who already paid for them.

💰 Bought pictures a purchased freedom
🩸 Christ paid that price in blood
🙅 Denial turns against their own rescuer
📖 This is betrayal, not just error

## 💥 Bring Upon Themselves Swift Destruction

This destruction is not forced on them from outside.

Peter says plainly that they bring it upon themselves.

Their own choices, not bad luck, cause their downfall.

"Swift" means this judgment will not drag on for ages first.

💥 Destruction comes from their own choice
🙋 Not forced on them from outside
⚡ Swift means it will not drag on
📖 Judgment follows choice, not chance

## 🚶 Many Shall Follow Their Pernicious Ways

"Pernicious" means harmful and destructive, even when it looks appealing.

Peter warns that many people, not just a few, will be fooled.

Deception often spreads exactly because it looks harmless at first.

A lie this convincing does not stay small for long.

🚶 Pernicious means harmful though appealing
👥 Many are fooled, not just a few
🎭 Deception often looks harmless at first
➡️ A convincing lie never stays small

## 🗣️ The Way Of Truth Shall Be Evil Spoken Of

Outsiders will judge all of Christianity by these teachers' bad behavior.

"The way of truth" is Peter's name for genuine Christian faith.

People who never read Scripture will still hear about the scandal.

One teacher's corruption can harm the whole faith's name.

🗣️ Outsiders judge faith by these scandals
✝️ Way of truth means real Christian faith
📰 Even nonreaders hear about the scandal
📖 One teacher harmed the whole faith's name

## 🛒 Through Covetousness Shall They With Feigned Words Make Merchandise Of You

"Covetousness" means greed, wanting more regardless of the cost to others.

"Feigned words" means invented lies dressed up to sound convincing.

"Make merchandise" means treating people as profit instead of souls to shepherd.

Peter names the whole scheme in one verse, motive, method, and goal together.

💰 Covetousness means greed at any cost
🎭 Feigned words means convincing invented lies
🛒 Make merchandise treats people as profit
📖 Motive, method, and goal named together

## 👁️ Lingereth Not, And Their Damnation Slumbereth Not

"Lingereth" and "slumbereth" both picture something sleeping or delayed.

Peter says plainly that this judgment is doing neither.

It has already been decided and is already active.

These teachers are not getting away with anything unnoticed.

😴 Lingereth and slumbereth picture delay or sleep
⚡ Peter says neither is happening here
✅ Judgment is already decided and active
📖 Nothing here goes unnoticed

# SecondPeter 2:4-9
# ⚖️ Three Warnings From History
---
## 👼 God Spared Not The Angels That Sinned

Some angels rebelled against God at some point in the unseen past.

Scripture does not give full detail about exactly when or how.

God did not excuse them just because they were angels.

Even the highest created beings answer to God.

👼 Even angels who sinned faced judgment
❓ Scripture does not detail the full story
🚫 Rank did not earn them an excuse
📖 Every created being answers to God

## ⛓️ Delivered Them Into Chains Of Darkness

The Greek word behind "hell" here is Tartarus, a word for the lowest place of confinement.

"Chains of darkness" pictures a prison with no light at all.

These fallen angels are not currently free to roam the world.

They are held, waiting for a judgment still to come.

🏴 Tartarus names the lowest holding place
⛓️ Chains of darkness means total confinement
🚫 They are not free to roam now
📖 They wait for a judgment still coming

## ⏳ Reserved Unto Judgment

"Reserved" means set aside, kept for a specific future purpose.

Their judgment was decided long ago.

Only the timing is still ahead.

This same pattern repeats three times across this chapter.

⏳ Reserved means set aside for later
✅ Their judgment was already decided
🔁 This same pattern repeats three times
📖 Timing is the only thing left

## 🌊 Saved Noah The Eighth Person

"The eighth person" counts everyone saved on the ark, not Noah's rank among them.

Noah, his wife, his three sons, and their wives make exactly eight people.

Peter calls Noah "a preacher of righteousness" here.

Noah warned his generation for years before the flood ever came.

🔢 Eighth person counts everyone on the ark
👨‍👩‍👧‍👦 Eight total people were saved
📣 Noah preached righteousness before the flood
📖 Warning came long before judgment did

## 🌍 Bringing In The Flood Upon The World Of The Ungodly

God did not destroy the old world without warning first.

Noah's preaching gave that entire generation a real chance to listen.

The flood came only after that warning was ignored for years.

Judgment followed a long patience, not a sudden whim.

🌍 The flood followed years of warning
📣 Noah's preaching gave a real chance
⏳ Judgment came after patience, not suddenly
📖 Ignored warning, not surprise, brought the flood

## 🔥 Turning The Cities Of Sodom And Gomorrha Into Ashes

Sodom and Gomorrah were cities destroyed in Genesis chapter nineteen.

Peter uses them as his second proof that God judges real sin in real history.

"Into ashes" stresses total, complete destruction, nothing left standing.

This was not a myth to Peter's readers.

It was remembered history.

🔥 Sodom and Gomorrah were real cities
📚 Genesis nineteen records their destruction
💨 Ashes means total, complete ruin
📖 Peter treats this as real history

## 📌 Making Them An Ensample Unto Those That After Should Live Ungodly

"Ensample" is an older spelling of example.

Sodom's destruction was recorded as a warning sign for every generation after it.

Peter is telling his readers that warning still applies to them.

History was not just remembered.

It was preserved on purpose.

📌 Ensample is an old word for example
⚠️ Sodom warns every later generation
👥 Peter applies that warning to his readers
📖 History preserved on purpose, not by accident

## 🙇 Delivered Just Lot, Vexed With The Filthy Conversation Of The Wicked

"Conversation" in the King James Bible means conduct or way of life, not just talk.

Lot lived surrounded by Sodom's wickedness every day.

"Vexed" means genuinely troubled and worn down by it.

God rescued Lot even though he was not perfect himself.

🗣️ Conversation here means conduct, not talk
🏙️ Lot lived surrounded by Sodom's sin
😣 Vexed means genuinely worn down
📖 God rescued him despite his flaws

## 😔 Vexed His Righteous Soul From Day To Day With Their Unlawful Deeds

Living among sin did not make Lot comfortable with it over time.

Peter stresses that Lot's distress was constant, day after day.

Being surrounded by wrong does not require giving in to it.

Righteousness can survive inside a wicked place.

📅 Lot's distress was daily, not occasional
🚫 Surroundings never numbed his conscience
💪 Righteousness can survive in a wicked place
📖 Surrounded does not mean surrendered

## 🛡️ The Lord Knoweth How To Deliver The Godly Out Of Temptations

This verse names the lesson behind all three examples at once.

God rescued Noah and Lot even while judging their world.

The same God still knows exactly how to protect His own people now.

Deliverance and judgment can happen in the very same moment.

🛡️ God knows how to protect His people
🌊 Noah and Lot prove the pattern
⚖️ The same God still protects today
📖 Deliverance and judgment can happen together

## ⚖️ Reserve The Unjust Unto The Day Of Judgment To Be Punished

"Reserve" repeats the same word used for the fallen angels in verse four.

A final day of judgment still waits ahead for anyone who refuses God.

Sodom and the old world were previews, not the final judgment itself.

The full reckoning is still to come.

🔁 Reserve echoes the word from verse four
📅 A final judgment day still waits
🌊 Past judgments were previews, not the end
📖 The full reckoning is still ahead

# SecondPeter 2:10-13
# 🐾 Beasts Without Reason
---
## 🔥 Walk After The Flesh In The Lust Of Uncleanness

"Walk after the flesh" describes a whole lifestyle built around physical desire.

"Uncleanness" covers sexual sin broadly, not one single act.

Peter is describing an entire direction of life, not a one time slip.

These false teachers built their whole pattern of living around it.

🚶 Walk after the flesh means a lifestyle
🔥 Uncleanness covers sexual sin broadly
🔁 This describes a pattern, not one slip
📖 Their whole direction was built on it

## 👑 Despise Government

"Government" here means any legitimate authority, not just rulers of nations.

These teachers resented being told what to do by anyone.

Pride made them treat correction as an insult instead of help.

Rejecting authority was part of the same rebellion as their lust.

👑 Government means any legitimate authority
😤 They resented correction from anyone
💔 Pride treated correction as an insult
📖 Rejecting authority matched their rebellion

## 😏 Presumptuous Are They, Selfwilled

"Presumptuous" means bold and reckless, acting without any proper fear.

"Selfwilled" means stubbornly set on getting their own way.

Together these words describe people who answer to no one but themselves.

That kind of pride always ends up targeting someone above them.

😏 Presumptuous means bold and reckless
🙋 Selfwilled means fixed on their own way
🚫 They answered to no one
📖 That pride always aims upward eventually

## 🗣️ Not Afraid To Speak Evil Of Dignities

"Dignities" likely refers to angelic beings or spiritual authorities, not just human leaders.

These teachers mocked powers far greater than themselves.

Peter says even they were not afraid to do this.

Their arrogance had no limit at all.

👼 Dignities likely means spiritual authorities
🗣️ They mocked powers greater than themselves
🚫 No fear held them back
📖 Their arrogance had no ceiling

## ⚖️ Bring Not Railing Accusation Against Them Before The Lord

Even powerful good angels do not throw careless insults at evil spiritual powers.

"Railing accusation" means a reckless, disrespectful insult.

Angels are stronger than these false teachers, yet far more restrained.

Real strength shows restraint that pride never can.

👼 Even strong angels stay restrained
🗣️ Railing accusation means a reckless insult
💪 Angels are stronger yet far calmer
📖 Real strength shows restraint pride lacks

## 🐾 As Natural Brute Beasts, Made To Be Taken And Destroyed

Peter compares these teachers to animals that act purely on instinct.

A wild animal does not reason.

It simply reacts.

These teachers let impulse replace thought the same way.

Living like an animal eventually ends like one.

🐾 Brute beasts act on instinct alone
🧠 No reasoning, only reaction
🔁 These teachers let impulse replace thought
📖 Living that way ends that way

## 🌀 Shall Utterly Perish In Their Own Corruption

"Corruption" pictures something rotting slowly from the inside.

Their destruction does not come from an outside enemy.

It comes from the very decay they chose to live in.

What they practiced eventually caught up with them.

🌀 Corruption pictures slow inner rot
🚫 No outside enemy causes this
🔄 Their own decay consumed them
📖 What they practiced caught up to them

## 🎉 Count It Pleasure To Riot In The Day Time

Most reckless living at least hides at night.

These teachers did it openly, even in broad daylight.

"Riot" means wild, excessive indulgence without restraint.

They had lost any sense of shame about it.

🌙 Most reckless living hides at night
☀️ These teachers did it in daylight
🎉 Riot means excessive, reckless indulgence
📖 Shame had completely disappeared

## 💔 Spots They Are And Blemishes

"Spots and blemishes" pictures a stain spreading across clean fabric.

These teachers sat at the same fellowship meals as genuine believers.

They used that trusted closeness to spread corruption quietly.

The danger was never distant.

It was sitting at the table.

🧵 Spots and blemishes picture a spreading stain
🍽️ They shared meals with real believers
🕵️ Closeness let the corruption spread
📖 The danger sat at the table itself

# SecondPeter 2:14-16
# 🐴 The Way Of Balaam
---
## 👁️ Eyes Full Of Adultery, And That Cannot Cease From Sin

This pictures eyes constantly scanning for the next wrong desire.

"Cannot cease" means losing the will to stop, not just the desire to.

Sin had become their default state, not an occasional failure.

Peter describes people fully given over to the pattern.

👁️ Eyes pictured constantly scanning for sin
🚫 Cannot cease means losing the will
🔁 Sin became their default, not a failure
📖 Fully given over to the pattern

## 🎣 Beguiling Unstable Souls

"Beguiling" means luring someone in through flattery or deception.

"Unstable" describes a believer who has not yet grown firm in faith.

Predators like this look for exactly that kind of person.

A weak foundation makes someone an easy target.

🎣 Beguiling means luring through deception
🏗️ Unstable means not yet firm in faith
🎯 Predators target exactly that weakness
📖 A weak foundation becomes an easy target

## 💰 An Heart They Have Exercised With Covetous Practices

"Exercised" pictures training, the same word used for athletic practice.

These teachers had trained their own hearts toward greed, on purpose, over time.

Greed like this is not an accident.

It is a practiced habit.

Years of small choices built this pattern.

🏋️ Exercised means deliberately trained
💰 Their hearts were trained toward greed
🔁 Greed became a practiced habit
📖 Years of small choices built this

## ⚠️ Cursed Children

This phrase is a Hebrew style idiom naming someone by their defining trait.

It means something closer to children defined by a curse.

It is not a statement about their birth or ancestry.

It describes the destiny their own choices were building toward.

⚠️ A Hebrew style naming idiom
🚫 Not about birth or ancestry
🎯 Describes a destiny, not an origin
📖 Their own choices built that destiny

## 🐴 Following The Way Of Balaam The Son Of Bosor

Balaam was a prophet hired to curse Israel for money in Numbers chapter twenty two.

Some manuscripts give his father's name as Beor rather than Bosor.

Many scholars treat the two names as the same person remembered differently.

Balaam loved the payment more than he loved obeying God.

🔮 Balaam was a prophet hired for money
📜 Numbers twenty two tells his story
📚 Beor and Bosor name the same man
📖 He loved payment more than obedience

## 🐴 The Dumb Ass Speaking With Man's Voice Forbad The Madness Of The Prophet

In Numbers chapter twenty two, Balaam's own donkey miraculously spoke to stop him.

A "dumb" animal here simply means unable to normally speak.

God used the least likely voice in the story to correct a rebellious prophet.

Even creation itself resisted Balaam's greed before God did.

🐴 Balaam's donkey miraculously spoke
🔇 Dumb here just means unable to speak
🎯 God used the least likely voice
📖 Creation resisted Balaam before judgment did

# SecondPeter 2:17-19
# 🌪️ Promises That Cannot Deliver
---
## 💧 Wells Without Water

A well promises water to anyone who is thirsty.

A well with no water inside is worse than no well at all.

It wastes the time of someone who was already desperate.

These teachers promised spiritual life they could never actually supply.

💧 A well promises water to the thirsty
🚫 An empty well is worse than none
⏳ It wastes a desperate person's time
📖 They promised life they could not supply

## 🌪️ Clouds That Are Carried With A Tempest

A storm cloud promises rain to a dry field below it.

A cloud blown past by a storm never delivers that rain.

These teachers looked like they carried something valuable.

They were blown along by their own impulses instead.

☁️ A storm cloud promises rain
🌪️ Wind blows it past without delivering
🎭 They looked like they carried value
📖 Their own impulses blew them along

## 🌑 The Mist Of Darkness Is Reserved For Ever

This repeats the same "reserved" language used for the fallen angels earlier.

"For ever" marks this as a permanent sentence, not a temporary one.

Empty wells and driftless clouds end in permanent darkness.

Nothing about this judgment gets undone later.

🔁 Reserved echoes the earlier angel judgment
♾️ For ever means permanent, not temporary
🌑 Emptiness ends in lasting darkness
📖 Nothing here gets undone later

## 🎙️ Great Swelling Words Of Vanity

"Swelling" pictures words puffed up bigger than their actual substance.

"Vanity" means empty, without any real content underneath the sound.

These teachers sounded impressive while saying almost nothing true.

Impressive sound is not the same thing as real truth.

🎙️ Swelling words sound bigger than they are
🎈 Vanity means empty underneath the sound
🎭 They sounded impressive, said little true
📖 Impressive sound is not truth

## 🎯 Allure Through The Lusts Of The Flesh, Through Much Wantonness

"Allure" means to deliberately draw someone toward temptation.

"Wantonness" means reckless, shameless indulgence without restraint.

Peter says their method was physical desire, not clever argument.

They won people over through appetite, not through truth.

🎯 Allure means deliberately drawing someone in
🔥 Wantonness means reckless, shameless indulgence
🍽️ Their method was appetite, not argument
📖 They won people through desire, not truth

## ⛓️ Promise Them Liberty, They Themselves Are The Servants Of Corruption

These teachers sold freedom while secretly living as slaves themselves.

"Servants of corruption" means corruption itself was their master.

Whatever controls a person's choices becomes their true owner.

A teacher enslaved to sin cannot hand anyone else real freedom.

⛓️ They sold freedom while enslaved themselves
👑 Corruption itself was their master
🔑 Whatever controls you owns you
📖 An enslaved teacher cannot give freedom

## 🔄 Of Whom A Man Is Overcome, Of The Same Is He Brought In Bondage

Whatever defeats a person becomes their master afterward.

This is a general rule, not only true for these teachers.

Freedom and slavery are both decided by what overcomes you.

Peter states the principle behind the whole warning plainly.

⚖️ States a general rule plainly
🥊 What defeats you becomes your master
🌍 True for these teachers and anyone
📖 What overcomes you decides your bondage

# SecondPeter 2:20-22
# 🐷 Turning Back
---
## 🧼 Escaped The Pollutions Of The World Through The Knowledge Of The Lord

"Escaped" here describes someone who genuinely tasted freedom from sin's grip.

"Knowledge of the Lord" points back to the same real knowing described in chapter one.

This is not describing someone who only pretended to believe.

Peter is talking about a real, recognized change.

🧼 Pollutions means sin's corrupting grip
🔗 Knowledge echoes chapter one's meaning
✅ This describes a real change
📖 Not a pretended belief

## 🔗 Again Entangled Therein, And Overcome

"Entangled" pictures getting caught back in something once escaped.

This person does not just stumble once.

They get recaptured.

Old sin can still pull someone back even after real freedom.

Escape once does not guarantee escape stays permanent on its own.

🔗 Entangled means getting caught again
🔄 More than one stumble, a recapture
⚠️ Old sin can still recapture someone
📖 Freedom is not automatically permanent

## 📉 The Latter End Is Worse With Them Than The Beginning

Returning to sin after tasting freedom leaves someone worse off than before.

Having seen the truth and walked away raises the stakes.

This is harder, not easier, than never having known it at all.

Knowledge once gained cannot simply be set aside without consequence.

📉 Returning leaves someone worse than before
📈 Seeing truth raises the stakes
🚫 Harder than never knowing at all
📖 Knowledge cannot be set aside free

## ⚖️ Better For Them Not To Have Known The Way Of Righteousness

Peter does not soften this hard, uncomfortable statement.

Knowing the truth and deliberately walking away carries real weight.

He is not saying truth itself is dangerous.

He is saying known truth, then rejected, is heavier than ignorance ever was.

⚖️ A hard statement Peter does not soften
📖 Truth is not the danger
🚫 Rejecting known truth carries real weight
➡️ Heavier than plain ignorance ever was

## 📜 Turn From The Holy Commandment Delivered Unto Them

"Delivered" means this teaching was personally handed to them, not just heard in passing.

Turning away means rejecting something they were specifically given.

This was not a stranger's rule learned secondhand.

It was a trust they personally received and then abandoned.

📜 Delivered means personally handed to them
🎁 Not a stranger's rule, secondhand
🤝 A personal trust, not a rumor
📖 They abandoned what they received

## 🐶 The Dog Is Turned To His Own Vomit Again

Peter quotes a real proverb, found already in Proverbs chapter twenty six.

A dog returning to its own vomit pictures something genuinely disgusting by nature.

Peter is not being gentle here on purpose.

He wants the picture to feel exactly as uncomfortable as it sounds.

📜 A real proverb from Proverbs twenty six
🤢 Pictures something disgusting by nature
🎯 Peter is deliberately not gentle
📖 The discomfort is the point

## 🐷 The Sow That Was Washed To Her Wallowing In The Mire

A sow is a female pig, and "mire" means thick, filthy mud.

Washing a pig does not change what a pig naturally wants to do.

The cleaning was only ever on the outside.

Real change has to reach deeper than outward appearance.

🐷 Sow means a female pig
🧽 Washing only changed the outside
🔄 A pig still wants the mud
📖 Real change must reach deeper
`.trim();

export const SECOND_PETER_TWO_PERSONAL_SECTIONS = parseSecondPeterTwoRawNotes(SECOND_PETER_TWO_RAW_NOTES);
