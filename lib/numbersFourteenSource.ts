export type NumbersFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersFourteenRawNotes(rawText: string): NumbersFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 14:${startVerse}` : `Numbers 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Numbers 14 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_FOURTEEN_RAW_NOTES = `# Numbers 14:1-4
# 😭 The Camp Despairs And Plans To Return
---
## 😭 Lifted Up Their Voice, And Cried

This means the whole camp cried out loud together.

It was not quiet sobbing alone in a tent.

Ten of the twelve spies had just called the land unconquerable.

Fear spread through the entire camp within moments.

Nobody paused to weigh Caleb and Joshua's different report.

😭 Loud crying, not quiet sobbing
⏱️ Comes right after the spies' report
🙉 Nobody weighs the two different reports
📖 Fear silenced two faithful voices
---
## 🌙 The People Wept That Night

Naming the night matters here.

This grief did not pass by morning.

It stretched through hours of darkness and lost sleep.

Jewish tradition later remembers this exact night on the calendar.

It marks the ninth day of the month Av.

The same date is later linked to the fall of Jerusalem.

🌙 A whole night of grief
📅 Later tradition names this night
🏛️ The same date later marks Jerusalem's fall
📖 A night of unbelief becomes a lasting memory
---
## 😤 Murmured Against Moses And Against Aaron

"Murmured" means a steady, grumbling complaint.

It is not one sharp outburst.

It is a habit already seen twice before.

Israel murmured over hunger back in Exodus 16.

Israel murmured over thirst and meat earlier in Numbers 11.

Complaining against Moses and Aaron really means complaining against God.

😤 Murmured means a grumbling habit
🍞 Already seen over hunger in Exodus 16
💧 And over thirst in Numbers 11
📖 Complaining at their leaders means complaining at God
---
## ⚰️ Would God That We Had Died In The Land Of Egypt

This is an old idiom for deep despair.

It does not mean they wanted to die that day.

People under real fear often say things they do not mean.

The same wish already appeared once before in Exodus 16:3.

What it reveals matters more than the words themselves.

They would rather have stayed slaves than trust God for one more step.

⚰️ An idiom for despair, not a real wish
🔁 The same complaint already appeared in Exodus 16
😨 Fear can make anyone say something untrue
📖 They would rather stay stuck than trust God
---
## 🏺 Wherefore Hath The LORD Brought Us Unto This Land

This question quietly turns the Exodus into a mistake.

God split the Red Sea and gave manna for over a year.

Now that same rescue gets blamed for leading them into danger.

Fear has a way of rewriting how people remember the past.

The very rescue they once celebrated now sounds like bad judgment.

Nothing changed about God.

Their fear changed how they saw Him.

🏺 Fear turns the Exodus into a mistake
🌊 God split the sea and gave manna
🎭 Fear rewrites how people remember the past
📖 Nothing changed about God, only their fear did
---
## 👶 Our Wives And Our Children Should Be A Prey

"Prey" means captured plunder, taken by force in a raid.

The fear here is that their own families will be seized.

This exact fear gets answered later in this same chapter.

Verse thirty one says it is precisely these children who inherit the land.

The very ones feared lost are the ones who receive the promise.

👶 Prey means plunder taken by force
😨 They fear their families will be seized
🔄 Verse thirty one reverses this fear directly
📖 The feared loss becomes the next generation's gain
---
## 👑 Let Us Make A Captain, And Let Us Return Into Egypt

This is open rebellion, not simple complaining.

The people want to replace God's chosen leaders.

Their new captain would have one job, undoing the Exodus itself.

Returning to Egypt meant choosing slavery again on purpose.

It is the clearest sign yet of how deep the unbelief runs.

👑 This is rebellion, not simple complaint
🔄 They want to replace God's chosen leaders
⛓️ Returning meant choosing slavery on purpose
📖 The clearest sign yet of deep unbelief

# Numbers 14:5-10
# 🙏 Moses And Aaron Intercede While Caleb And Joshua Plead
---
## 🙇 Fell On Their Faces Before All The Assembly

This posture looks like collapse but it is not.

It is a specific position of urgent prayer.

Moses and Aaron are appealing to God for the people.

They have every reason to be angry at the people right now.

The crowd is threatening to overthrow them entirely.

Instead their first move is toward God, not toward defending themselves.

🙇 A posture of urgent prayer, not collapse
😠 They have reason to be furious right now
🛡️ Their first move is toward God
📖 They chose prayer over self defense
---
## 👕 Rent Their Clothes

Tearing your own clothing was a standard ancient sign.

It showed grief, horror, or protest against something deeply wrong.

The same act shows up elsewhere for mourning a death.

It also appears as a reaction to blasphemy.

Here it shows genuine anguish at what the camp is about to do.

The whole nation is about to reject a promise God confirmed personally.

👕 An ancient sign of grief or protest
⚰️ Elsewhere used for mourning a death
😱 Also used for reacting to blasphemy
📖 Grief here is over a rejected promise
---
## 🌾 An Exceeding Good Land

Caleb and Joshua saw exactly what the other ten spies saw.

They saw the same walled cities as the other ten spies.

They saw the same tall people there too.

They scouted the same forty days.

The facts on the ground never changed.

What changed was the conclusion drawn from them.

Only two of the twelve landed on trusting God's promise.

🌾 Same walled cities, same tall people, same days
⚖️ The facts never changed
🎯 Only the conclusion changed
📖 Only two of twelve trusted God's promise
---
## ❤️ If The LORD Delight In Us

This is not a boast about Israel's own strength.

It is an appeal to God's own attitude toward His people.

Everything hinges on whether God delights in them, not on army size.

The other ten spies left this idea out of their report completely.

Caleb and Joshua build their whole argument on God's favor instead.

❤️ An appeal to God's favor, not Israel's strength
🎯 Everything hinges on God, not army size
🙈 The other ten spies left this out
📖 Their argument rests on God's favor alone
---
## 🍞 They Are Bread For Us

This is a vivid idiom, not a claim about food.

It means the Canaanites will be consumed as easily as a meal.

Caleb is not denying the enemy exists.

He is denying that they pose any real threat.

The other ten spies said the land itself devours its people back in chapter thirteen.

Caleb flips that image entirely.

Israel will do the consuming now.

🍞 An idiom for easy defeat, not food
🙅 Caleb does not deny the enemy exists
🔄 He flips the other spies' image completely
📖 Confidence rests on who fights for Israel
---
## 🛡️ Their Defence Is Departed From Them

"Defence" here likely points to something unseen.

Not walls or weapons but spiritual protection.

Caleb is saying that unseen backing has already been withdrawn.

This is a claim about invisible reality.

The other ten spies had no way to scout for that.

Caleb and Joshua speak from what God already said, not from what they saw.

🛡️ Defence likely means unseen, spiritual protection
👁️ A claim no scout could measure
🗣️ Built on God's word, not the eyes
📖 Faith saw what scouting never could
---
## 🪨 Bade Stone Them With Stones

The crowd's answer to a true report is an attempt at murder.

Stoning was the era's standard method for a capital sentence.

It was usually reserved for the most serious crimes.

The rebellion has now escalated three full steps.

Grumbling in verse two became a plan to return to Egypt in verse four.

Now it becomes an attempt to kill the two faithful men.

🪨 Stoning was the era's capital sentence
📈 The rebellion escalates verse by verse
😱 Grumbling has turned into attempted murder
📖 Truth was met with violence, not repentance
---
## ✨ The Glory Of The LORD Appeared

This is the same visible presence seen before.

It filled the tabernacle back in Exodus forty.

It appeared before Aaron's first offering in Leviticus nine.

Here it interrupts at the exact moment the stoning is about to happen.

God stops a murder before it happens.

This sets up the confrontation that fills the rest of the chapter.

✨ The same presence seen in Exodus 40
🔥 And again in Leviticus 9
⏱️ It appears the instant the stoning nears
📖 God stops a murder before it starts

# Numbers 14:11-12
# ⚖️ God's First Verdict
---
## ❓ How Long Will This People Provoke Me

This sounds like a question but it is not really asking for a number.

It expresses God's exasperation at a pattern that keeps repeating.

The same phrase, how long, returns again from God in verse twenty seven.

That repetition frames this whole episode around patience finally worn thin.

❓ Not a literal request for a number
😤 Expresses God's own exasperation here
🔁 The same how long returns in verse 27
📖 Patience finally reaches its limit
---
## 🎆 All The Signs Which I Have Shewed Among Them

"Shewed" is an old spelling of showed.

This points to a specific, countable list of miracles.

The ten plagues, the Red Sea crossing, water from a rock, and daily manna.

Unbelief after all of that is not a lack of evidence.

It is a refusal to trust evidence that is already overwhelming.

🎆 Plagues, the Red Sea, manna, and more
📊 A specific, countable list of miracles
🙈 Unbelief is not a lack of evidence
📖 It is a refusal to trust it
---
## ☠️ I Will Smite Them With The Pestilence, And Disinherit Them

"Pestilence" means a deadly plague or disease.

"Disinherit" means to remove someone's right to an inheritance.

God's first proposal here is the harshest option on the table.

It would wipe out the entire adult generation immediately.

That is far harsher than the slower forty year sentence that actually follows.

☠️ Pestilence means a deadly plague
📜 Disinherit means losing a rightful inheritance
🔥 God's harshest option, proposed first
📖 A milder sentence follows instead
---
## 🌳 Make Of Thee A Greater Nation And Mightier Than They

God offers to start completely over, with Moses alone.

This is the same offer made once before.

It came right after the golden calf in Exodus thirty two.

This is really a test of Moses' character repeating itself.

Moses turns the offer down again.

He pleads for the very people threatening his life.

🌳 The same offer already made in Exodus 32
🔁 A repeated test of Moses' character
🙅 Moses turns down the promotion again
📖 He chooses the people over himself

# Numbers 14:13-19
# 🙇 Moses Pleads For Mercy
---
## 🇪🇬 Then The Egyptians Shall Hear It

Moses' first argument is not about Israel's worthiness.

It is about God's own reputation.

Egypt watched the ten plagues and the Red Sea happen firsthand.

Word of Israel's fate would eventually reach them too.

Moses reminds God of the stakes His own past actions created.

🇪🇬 The argument centers on God's reputation
👀 Egypt already saw the plagues and the sea
🗣️ Moses points back to what God did
📖 God's actions were never done in secret
---
## 🔥 Thy Cloud Standeth Over Them

This describes the same guidance already set up long ago.

A cloud led them by day.

Fire led them by night.

That system began back in Exodus thirteen.

It marked God's presence for anyone watching, not just Israel.

Moses' point is that the surrounding nations already know this detail.

🔥 The same guidance from Exodus 13
🌍 A public sign, not a private one
👀 Every nearby nation already knows it
📖 God's presence was never hidden
---
## 😧 If Thou Shalt Kill All This People As One Man

Moses raises what is actually at stake here.

Sudden destruction would not happen quietly.

Every nation that heard of Israel's God would notice.

This is not Moses doubting God's power to do it.

It is Moses warning how the act would be understood by others watching.

😧 Warns that destruction would not stay quiet
📢 Every watching nation would take notice
🙅 Not doubting God's power to act
📖 Warning how the act would look
---
## 🗣️ Because The LORD Was Not Able

This is the exact rumor Moses fears most.

Watching nations might conclude God simply could not finish what He started.

They would mistake judgment for failure.

This is Moses' sharpest argument in the whole prayer.

He is not asking God to overlook the sin.

He is asking God to guard His own name instead.

🗣️ The exact wrong conclusion nations would draw
🎯 Moses' sharpest argument in this prayer
🛡️ Mercy protects God's name here
📖 Judgment mistaken for failure helps no one
---
## 🙏 I Beseech Thee

"Beseech" means to beg or plead earnestly.

It is far more urgent than a formal request.

Moses shifts here from arguing a case to simply pleading.

The word appears twice in this short prayer, also in verse nineteen.

That repetition marks the emotional center of the whole intercession.

🙏 Beseech means to beg earnestly
🔁 Used twice in this same prayer
❤️ Marks the prayer's emotional center
📖 Moses moves from argument to pleading
---
## 📜 The LORD Is Longsuffering, And Of Great Mercy

Moses is quoting God's own words back to Him here.

God revealed this exact description of Himself in Exodus thirty four.

That happened right after the golden calf.

"Longsuffering" means patient over a long time, slow to anger.

Moses grounds his appeal in who God already said He is.

📜 Quotes God's own words from Exodus 34
⏳ Longsuffering means patient over a long time
🔁 First said right after the golden calf
📖 Moses argues from God's own character
---
## ⚖️ By No Means Clearing The Guilty

This balances the mercy just described.

Forgiveness does not erase every consequence.

Real guilt still carries real weight even when God forgives.

This sets up exactly what happens next in the chapter.

The nation is spared from destruction but still barred from the land.

Mercy and consequence sit side by side here.

⚖️ Forgiveness does not erase consequences
🔮 Sets up the pardon still barred pattern
🤝 Mercy and consequence can coexist
📖 Being spared is not the same as unpunished
---
## 👨‍👩‍👧‍👦 Visiting The Iniquity Of The Fathers Upon The Children

This phrase is also quoted from Exodus thirty four.

It does not mean children are punished for a parent's specific sin.

It describes how sin's consequences ripple into later generations.

Here it becomes painfully literal.

This generation's children will grow up wandering because of their parents' choice.

They themselves are not judged for the original sin.

👨‍👩‍👧‍👦 Consequences ripple into later generations
🚫 Not personal punishment for someone else's sin
🏜️ Here it becomes a literal wandering
📖 Children bear the effect, not the guilt
---
## 💰 According Unto The Greatness Of Thy Mercy

This is Moses' actual, specific request.

It is not a vague hope.

He grounds it entirely in the size of God's mercy.

Moses does not argue that the people deserve forgiveness.

He argues that God's mercy is great enough to cover even this.

That is a very different kind of appeal.

💰 A direct request, not a vague hope
🎯 Grounded in mercy, not merit
🙏 Not deserving it, but trusting it
📖 God's mercy is asked to be large enough

# Numbers 14:20-25
# ✅ Pardoned Yet Barred From The Land
---
## ✅ I Have Pardoned According To Thy Word

God grants Moses' specific request from verse nineteen.

The nation as a whole will not be destroyed.

Moses' prayer directly changed the outcome on the table in verse twelve.

Pardon here does not mean the incident gets forgotten.

Pardon means survival, not the absence of every consequence.

✅ Grants Moses' exact request from verse 19
🔄 Changes the destruction proposed in verse 12
🛡️ Pardon here means survival
📖 Survival is not the same as no consequence
---
## 🌍 All The Earth Shall Be Filled With The Glory Of The LORD

This promise reaches far beyond this one moment in the wilderness.

God's larger purpose for all creation still stands.

One generation's failure cannot derail it.

The prophet Habakkuk later echoes this almost word for word.

That promise stayed alive in Israel's memory for centuries.

🌍 A promise reaching past this one moment
📚 Echoed later almost word for word in Habakkuk
🌱 One failure does not derail God's purpose
➡️ The promise outlives this whole generation
---
## 🔟 Tempted Me Now These Ten Times

This tallies a specific pattern of repeated rebellion.

It spans across Exodus and Numbers.

Fear at the Red Sea, bitter water at Marah, and manna hoarding.

The golden calf, and later complaints at Taberah and Kibroth Hattaavah.

This spy report rebellion caps that whole list.

The number matters here.

It is judgment after a long pattern, not one bad moment.

🔟 Tallies a repeated pattern across two books
🌊 Includes the Red Sea, Marah, and manna
🐄 Also the golden calf and later complaints
📖 Judgment follows a long pattern, not one moment
---
## 🚷 Surely They Shall Not See The Land

Here is the actual sentence, distinct from verse twelve's proposal.

The adult generation is spared from dying immediately.

They are still barred from the one thing they traveled toward.

Pardon and consequence turn out to be two separate things.

Being forgiven does not automatically mean keeping the promise unchanged.

🚷 The real sentence, apart from verse 12
✂️ Spared from death, barred from the goal
⚖️ Forgiveness and consequence are two things
📖 Being forgiven does not undo every loss
---
## ⭐ My Servant Caleb

"My servant" is a title of honor.

Scripture uses it sparingly, for people in close, trusted relationship with God.

Moses himself later receives this same title in Numbers twelve.

David receives it too.

God speaks it directly and personally here.

He marks Caleb out by name as the clear exception.

⭐ A rare title for someone close to God
👑 Later used for Moses and David
🎯 Spoken directly and personally here
📖 Caleb is marked out by name
---
## 💫 Because He Had Another Spirit With Him

This does not describe extra bravery.

Caleb saw the very same giants and walled cities as everyone else.

The difference was internal, a different attitude toward what he saw.

"Another spirit" points to trust that let God's promise outweigh what his eyes saw.

That is exactly what the other ten spies failed to do.

💫 Not extra bravery, the same obstacles
🎯 Points to trust over visible fear
👁️ God's promise outweighed what he saw
📖 The one quality the other ten lacked
---
## 🎯 Hath Followed Me Fully

This becomes something close to Caleb's permanent label.

The exact phrase is repeated about him decades later.

He is an old man still asking for his inheritance in Joshua fourteen.

It describes sustained faithfulness over time.

Not one single good decision but a whole life.

🎯 Repeated about Caleb decades later
📚 Found again in Joshua chapter 14
⏳ Describes a whole life, not one moment
➡️ Faithfulness sustained is faithfulness proven
---
## 🌊 Get You Into The Wilderness By The Way Of The Red Sea

This is God's direct command reversing Israel's direction.

Advancing north into Canaan is no longer an option today.

They are sent back south instead, retracing steps toward the Red Sea region.

This single command marks the literal start of the forty years of wandering.

Everything left in the book of Numbers flows from this one turn.

🌊 Reverses Israel's direction toward the Red Sea
🔙 Marks the start of forty years wandering
📖 One command shapes the rest of Numbers
➡️ The road forward becomes a road back

# Numbers 14:26-30
# ⚰️ The Sentence Is Formalized
---
## ⏳ How Long Shall I Bear With This Evil Congregation

This echoes God's own question from verse eleven almost exactly.

It is not a brand new complaint.

It is the same patience finally reaching its limit.

God is not reacting suddenly here.

This verdict follows a pattern already named twice in a few verses.

⏳ Echoes God's own question from verse 11
🔁 The same patience reaching its limit
🚫 Not a sudden reaction from God
📖 One pattern, named twice, now judged
---
## 🗣️ As Ye Have Spoken In Mine Ears, So Will I Do To You

This is a haunting reversal.

Back in verse two the people said, would God we had died.

God now takes their own words and turns them into the sentence.

This is not God being cruel or petty.

It shows how seriously words spoken in unbelief are actually taken.

They asked, in effect, for the wilderness to become their grave.

That is exactly what gets granted.

🗣️ Turns their own words into the sentence
⚖️ Shows how seriously unbelief speaks
😨 Not cruelty, but taking words seriously
📖 They asked for a grave and received one
---
## 💀 Your Carcases Shall Fall In This Wilderness

"Carcases" is a blunt, harsh word for dead bodies.

It is not a softer word like remains.

The KJV's choice here is meant to land hard.

This phrase repeats again later in verse thirty two.

It functions almost like a refrain through the rest of the chapter.

The repetition drives home how final the sentence really is.

💀 Carcases is a blunt word for dead bodies
🔁 Repeats again later in verse 32
📢 Functions like a refrain in this chapter
📖 Repetition proves the sentence is final
---
## 🎖️ From Twenty Years Old And Upward

This ties directly back to the military census in Numbers one.

That census counted every man of fighting age.

Those very men are the ones excluded here.

It is a pointed irony.

The census that once measured strength for entering the land now defines who cannot enter it.

🎖️ Matches the census age from Numbers 1
🔄 The counted fighters are the ones excluded
🎯 A pointed irony in one number
📖 The census now defines who stays out
---
## 🌟 Save Caleb The Son Of Jephunneh, And Joshua The Son Of Nun

This confirms what was already said about Caleb personally in verse twenty four.

Joshua's name is now formally added to that same exception.

Both men are set apart for the same underlying reason.

They trusted God's promise instead of fearing what they saw.

Only Caleb's specific reason had been spelled out before this point.

🌟 Confirms Caleb's exception from verse 24
➕ Formally adds Joshua's name here
🤝 Both trusted the promise over fear
📖 Two names, one shared reason

# Numbers 14:31-35
# 👶 Forty Years For Forty Days
---
## 👶 Your Little Ones, Which Ye Said Should Be A Prey

This directly reverses the parents' fear from verse three.

They worried their children would become prey.

Instead these very children receive the promise their parents rejected.

The irony is deliberate here.

What the older generation feared losing becomes the next generation's gain.

That happens because of the parents' unbelief, not despite it.

👶 Reverses the parents' fear from verse 3
🔄 The children inherit what parents rejected
🎯 A deliberate irony, not an accident
📖 Loss feared becomes the next gain
---
## 💔 The Land Which Ye Have Despised

"Despised" is a strong word for contempt or rejection.

It is not simple caution or fear.

This reframes the spies' report as more than a mistake.

It becomes an active rejection of God's own gift.

Fear alone might call for correction.

Despising a gift from God is treated as far more serious.

💔 Despised means contempt, not caution
⚖️ Reframes the report as active rejection
😤 Fear and contempt are judged differently
📖 Rejecting a gift is treated as serious
---
## 🏜️ Your Children Shall Wander In The Wilderness Forty Years

This is the first place the sentence's length is stated plainly.

Forty full years, not a vague long time.

This one number will define the rest of the book of Numbers.

It shapes an entire generation's whole life.

It only ends once every adult from this rebellion has died.

🏜️ The first explicit length of the sentence
📖 Shapes the rest of the book of Numbers
⏳ Ends only when this generation dies
➡️ One number, one whole generation's life
---
## 💍 Bear Your Whoredoms

"Whoredoms" is the KJV's word for unfaithfulness.

Scripture often uses it as a metaphor for breaking covenant with God.

It works like a spouse's unfaithfulness, not always a literal sin here.

Israel's bond with God is often pictured as a marriage.

Turning to fear instead of trust gets described the very same way.

💍 A metaphor for breaking covenant
🤝 Pictures Israel's bond with God as marriage
😨 Fear is treated like turning to another god
📖 Unfaithfulness names more than one kind of sin
---
## 📆 Each Day For A Year

This explains the exact math behind the forty year sentence.

The twelve spies spent forty days scouting the land back in chapter thirteen.

Each of those days becomes one full year of consequence.

This is a deliberate, exact correspondence.

It is not a round number picked only for effect.

📆 Forty scouting days become forty years
🔗 Ties directly to Numbers 13's forty days
🎯 An exact match, not a round number
📖 The investigation's length sets the sentence's length
---
## 💔 Ye Shall Know My Breach Of Promise

This striking phrase does not mean God breaks His promise to Abraham.

That promise about the land still stands.

It will still be fulfilled through the very next generation.

It means this specific generation will feel God withholding what they refused to trust for.

"Breach" here describes their own experience of loss.

It does not describe any change in God's character.

💔 Not a broken promise to Abraham
🎯 Means this generation loses what they refused
📖 Describes their loss, not God's character
➡️ The promise moves to the next generation
---
## 📢 I The LORD Have Said, I Will Surely Do It

This closing line formally seals the judgment.

It uses the strongest possible language of certainty available.

It functions like a legal signature on the sentence just given.

Nothing here is left ambiguous.

Nothing is left open for further negotiation.

📢 Seals the judgment with total certainty
✍️ Functions like a legal signature
🚫 Nothing left ambiguous here
📖 The sentence is closed, not open

# Numbers 14:36-38
# ☠️ The Ten Spies Die While Caleb And Joshua Live
---
## 😢 Made All The Congregation To Murmur Against Him

This places direct responsibility on the ten spies for the rebellion.

They did more than give an inaccurate report.

Their words actively caused the nation's response to it.

Leadership carries extra weight here.

These were trusted tribal leaders named back in chapter thirteen.

Their words shaped the whole camp far more than one ordinary complaint could.

😢 Direct blame for causing the rebellion
👑 Their status as leaders gave extra weight
📢 Their words shaped the whole camp
📖 A report became an active cause
---
## 📰 Bringing Up A Slander Upon The Land

"Slander" confirms an idea already introduced back in chapter thirteen.

That earlier verse called it an evil report.

This gives that earlier idea its clearest English label.

The word choice makes the moral weight unmistakable.

This was not simply a discouraging assessment.

It was treated as a false and harmful accusation.

📰 Confirms chapter 13's evil report
⚖️ Makes the moral weight unmistakable
🚫 Not discouragement, but false accusation
📖 Words about the land carried real weight
---
## ⚡ Died By The Plague Before The LORD

The ten spies receive swift, individual, and immediate judgment.

That is a sharp contrast with the slower forty year sentence for the rest of the nation.

Their leadership role in causing the rebellion made their responsibility greater.

Their punishment reflects that same difference in severity.

⚡ Swift judgment, unlike the nation's slower sentence
📊 Reflects their greater personal responsibility
👑 Leadership in sin brought harsher consequence
📖 Greater influence carried greater accountability
---
## 🌱 Lived Still

This closes the spy story with a deliberate contrast.

All twelve men were sent on the same mission.

All twelve saw the same land and gave their reports.

Only two survive even this immediate judgment.

The chapter separates Caleb and Joshua's fate from the other ten's entirely.

🌱 A deliberate two versus ten contrast
🎯 Same mission, same land, different fate
✅ Confirms what was already promised to them
📖 Faithfulness set two men apart from ten

# Numbers 14:39-45
# ⚔️ The Presumptuous Attack And Defeat At Hormah
---
## 😭 The People Mourned Greatly

Real grief finally sets in once the sentence feels final.

It is no longer a possibility but their own future for the rest of their lives.

This mourning comes only after the verdict, not before it.

The despair back in verse one was fear of what might happen.

This is grief over what has now actually been decided.

😭 Grief sets in only after the verdict
⏱️ Unlike the earlier fear in verse 1
🔒 Their future is now settled, not uncertain
📖 Grief over what is decided, not feared
---
## ⛰️ Gat Them Up Into The Top Of The Mountain

"Gat them up" is an old way of saying went up.

A group suddenly reverses course here.

They try to march into the land after all.

Nobody told them to do this.

This sudden reversal looks like courage on the surface.

It is actually one more act of disobedience.

⛰️ Gat them up means went up
🔄 A sudden reversal, uninvited
🎭 Looks like courage on the surface
📖 It is disobedience wearing courage's mask
---
## 😔 For We Have Sinned

This sounds like repentance on the surface.

The actions that follow reveal that it is not.

True repentance would have accepted the wilderness sentence.

Instead they try to undo the consequence by force.

Regretting a result is not the same as submitting to God.

Wanting punishment removed differs from actually turning back to Him.

😔 Sounds like repentance, is not
🎭 Real repentance accepts the sentence
🚫 Regret is not the same as submission
📖 True turning trusts God, not force
---
## 🔄 Wherefore Now Do Ye Transgress The Commandment Of The LORD

Moses points out a sharp irony here.

Yesterday's sin was refusing to go up when God said go.

Today's sin is going up when God says do not.

Same disobedience, pointed the opposite direction.

The real problem was never about the destination.

It was always about refusing to listen to God either way.

🔄 Same disobedience, opposite direction now
🎯 Yesterday refused to go, today goes anyway
👂 The real issue was never the direction
📖 Listening to God was always the point
---
## 🚫 The LORD Is Not Among You

This names the one ingredient missing from Caleb's earlier confidence in verse nine.

Without God's presence, none of the courage or numbers matter.

The same army that could have won with God's backing marches out with nothing behind it now.

Confidence without God is not confidence at all.

🚫 Names the missing ingredient behind Caleb's confidence
⚔️ Without God, numbers do not matter
🎯 The same army now marches with nothing
📖 Presence, not numbers, wins the battle
---
## 😤 They Presumed To Go Up Unto The Hill Top

"Presumed" means acting with arrogant overconfidence.

It means doing something without permission or right.

That is the text's own judgment on this attempt.

It is stated directly, not implied.

This was never brave initiative.

The text itself labels it as overstepping what they had any right to attempt.

😤 Presumed means acting without permission
📖 The text's own direct judgment
🚫 Not brave initiative, but overstepping
➡️ Confidence without God is presumption
---
## 📦 The Ark Of The Covenant, And Moses, Departed Not Out Of The Camp

The ark represented God's presence going ahead of Israel into battle.

It plays this same role later at the Jordan crossing in Joshua three.

It plays it again at the fall of Jericho in Joshua six.

Its absence here is the clearest sign this attack has no backing at all.

Even Moses himself stays behind.

He refuses to take part in what he already knows will fail.

📦 Represents God's presence in battle
🌊 The same role in Joshua's battles
🚫 Its absence signals no divine backing
📖 Moses himself refuses to go
---
## 💥 Smote Them, And Discomfited Them

"Discomfited" means routed, thrown into scattered and confused defeat.

That is stronger than simply losing a fight.

It describes real panic and disorder among the attackers.

This outcome matches exactly what Moses warned back in verses forty two and forty three.

The defeat is not a surprising twist.

It is the predictable result of going without God.

💥 Discomfited means routed in confused defeat
📜 Matches Moses' own warning exactly
🎯 Not a twist, but a prediction
📖 Defeat without God was never a surprise
---
## 🏷️ Even Unto Hormah

"Hormah" means destruction in Hebrew.

The name gets tied permanently to this defeat.

This same naming pattern already appeared with Eshcol's grape cluster in chapter thirteen.

This name gets a second, different chapter later in the story.

In Numbers twenty one, Israel returns to this same region and wins instead.

One place carries two very different outcomes.

It depends entirely on whether God goes with them.

🏷️ Hormah means destruction in Hebrew
🔮 A different outcome later in Numbers 21
🗺️ One place, two very different results
📖 The difference was whether God went with them
`.trim();

export const NUMBERS_FOURTEEN_PERSONAL_SECTIONS = parseNumbersFourteenRawNotes(NUMBERS_FOURTEEN_RAW_NOTES);
