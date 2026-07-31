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
This is loud, public wailing — not quiet tears, but a whole camp crying out together where everyone could hear. It happens the instant the ten spies' fearful report in chapter 13 lands.
The reaction is instant and total. No one pauses to weigh Caleb's faith-filled counter-report against the other ten men's fear — the whole camp reacts as one.
😭 Loud, public wailing, not quiet tears
⏱️ Comes immediately after the ten spies' report
🔑 No one stops to weigh the two different reports first
---
## 🌙 The People Wept That Night
Naming the night matters — this isn't a brief outburst that passes by morning. The despair stretches across hours of darkness, the kind of grief that keeps a person from sleeping.
Jewish tradition later remembers this specific night as the ninth of Av (Tisha B'Av), the same calendar date later associated with the destruction of both Jerusalem temples — a night of weeping becoming, centuries later, a recurring day of national mourning.
🌙 An entire night of grief, not a passing moment
📅 Later Jewish tradition ties this night to Tisha B'Av
🔑 A single night of unbelief becomes a lasting pattern
---
## 😤 Murmured Against Moses And Against Aaron
"Murmured" means an ongoing, grumbling complaint — not one sharp outburst but a habit. This exact word already described Israel's response to hunger in Exodus 16 and to thirst and meat-cravings earlier in Numbers 11.
The complaint isn't really about Moses and Aaron personally. It's aimed at the two men God chose to lead, which makes it functionally a complaint against God's own choice of leadership.
😤 "Murmured" describes a habit, not a single outburst
🔁 The same word already used in Exodus 16 and Numbers 11
🔑 Complaining against Moses and Aaron means complaining against God's choice
---
## ⚰️ Would God That We Had Died In The Land Of Egypt
This is a Hebrew idiom for extreme despair, wishing for death rather than facing what's ahead — not a literal request. People under this kind of fear often say things they don't fully mean.
The tragedy is what this wish reveals: they would rather have died as slaves in Egypt, or die right now in the wilderness, than trust God for one more step forward into the land He already promised.
⚰️ An idiom of despair, not a literal death wish
🔗 The exact same complaint already appeared in Exodus 16:3
🔑 Reveals they'd rather stay stuck than trust God's next step
---
## 🏺 Wherefore Hath The LORD Brought Us Unto This Land
This question quietly recasts the entire Exodus as a mistake or a trap. The God who split the Red Sea and fed them manna for over a year gets blamed for leading them somewhere dangerous.
Fear has a way of rewriting the past. The same rescue they celebrated in Exodus 15's song now gets reinterpreted as bad judgment on God's part, simply because the next step looks hard.
🏺 Reframes the Exodus rescue as a mistake
🎭 Fear rewrites how they remember God's past faithfulness
🔑 Blames God for leading them toward the very promise He made
---
## 👶 Our Wives And Our Children Should Be A Prey
"Prey" means captured plunder, like animals or goods taken in a raid — the fear is that their own families will be seized or killed by the people living in Canaan.
This exact fear gets directly answered and reversed later in this same chapter. In verse 31, God says it's precisely these children — the ones feared to become prey — who will actually inherit the land their parents refuse to trust Him for.
👶 "Prey" means captured plunder, taken by force
🔄 Directly answered and reversed later in verse 31
🔑 The children they fear losing are the ones who will inherit
---
## 👑 Let Us Make A Captain, And Return Into Egypt
This is open rebellion, not just complaining. The people propose replacing God's chosen leaders with a new one whose entire job would be undoing the Exodus itself.
Going back to Egypt would mean returning to slavery on purpose, choosing bondage over an uncertain but promised freedom. It's the clearest possible sign of how far unbelief has carried the whole camp.
👑 Proposes replacing God's chosen leadership entirely
⛓️ Would mean choosing slavery again, on purpose
🔑 The clearest sign yet of how deep the unbelief runs

# Numbers 14:5-10
# 🙏 Moses And Aaron Intercede; Caleb And Joshua Plead
---
## 🙇 Moses And Aaron Fell On Their Faces
This posture isn't collapse or despair — it's a specific position of urgent prayer, appealing to God on the people's behalf right at the moment things are most dangerous.
Moses and Aaron have every reason to be angry at the people threatening to overthrow them. Instead, their first move is toward God, not toward self-defense.
🙇 A posture of urgent intercession, not despair
🛡️ Not self-defense — turning to God on the people's behalf
🔑 Chosen instead of anger, right when anger would be easy
---
## 👕 Joshua And Caleb Rent Their Clothes
Tearing your own clothing was a standard ancient expression of grief, horror, or protest against something deeply wrong — used elsewhere for mourning a death or reacting to blasphemy.
Here it signals genuine anguish at what they're witnessing: the whole nation about to reject the promise God already confirmed to them personally, back in chapter 13:2.
👕 A standard ancient sign of grief or horror, not sadness alone
📜 Elsewhere used for mourning a death or reacting to blasphemy
🔑 Grief here is over the nation rejecting God's own promise
---
## 🌾 The Land...Is An Exceeding Good Land
Caleb and Joshua saw exactly the same walled cities, the same tall Anakim, the same forty days of terrain as the other ten spies. The facts on the ground haven't changed.
What's different is the conclusion drawn from those facts. Good land, real obstacles, and God's promise can all be true at the same time — and only two of the twelve spies manage to hold all three together.
🌾 Same facts, same terrain as the other ten spies
⚖️ The difference is the conclusion drawn from the facts
🔑 Only two of twelve hold the good land and God's promise together
---
## ❤️ If The LORD Delight In Us
This isn't a boast about Israel's own strength or numbers. It's an appeal to God's own attitude toward His people — everything hinges on His favor, not on how many soldiers Canaan has.
Framing the whole outcome around God's delight, rather than Israel's ability, is exactly what the other ten spies left out of their report entirely.
❤️ An appeal to God's favor, not Israel's own strength
🎯 Everything hinges on God, not army sizes
🔑 The missing ingredient in the other ten spies' report
---
## 🍞 They Are Bread For Us
This is a vivid idiom meaning the Canaanites will be easily consumed, the way food gets eaten without a fight. Caleb isn't denying the enemy exists — he's denying that they're a real threat given who is on Israel's side.
The contrast with the other spies' language is sharp. Where they said the land "eateth up the inhabitants" (13:32), Caleb flips the image entirely — Israel, not the land, will do the consuming.
🍞 An idiom for easy defeat, not literal food
🔄 A direct reversal of the other spies' "land eats people" image
🔑 Confidence built on who's fighting for Israel, not army size
---
## 🛡️ Their Defence Is Departed From Them
"Defence" here likely points to spiritual protection, not just walls and weapons — the sense that whatever unseen backing the Canaanites had has already been withdrawn.
This is a claim about unseen reality, something the other ten spies couldn't measure by scouting alone. Caleb and Joshua are speaking from faith in what God already said, not from anything visible on the ground.
🛡️ Points to unseen, spiritual protection, not just walls
👁️ A claim the other ten spies had no way to scout for
🔑 Built on faith in God's word, not visible evidence
---
## 😱 Only...Fear Them Not
Caleb and Joshua name the real issue directly: this was never actually about military odds. Rebellion against God and fear of people are treated here as the same problem, not two separate ones.
Their final word to the whole terrified camp is remarkably simple — don't rebel, and don't be afraid. Both commands rest on the same foundation: the LORD is with us.
😱 Names rebellion and fear as one and the same problem
🎯 The whole speech's simplest and final command
🔑 Both commands rest on one foundation: the LORD is with us
---
## 🪨 Bade Stone Them With Stones
The crowd's response to a faith-filled, true report is an attempt to execute the two men who gave it. Stoning was the era's standard method for a capital sentence, usually reserved for the most serious crimes.
This is the clearest evidence yet of how far the rebellion has escalated — from grumbling in verse 2 to plotting to return to Egypt in verse 4 to now attempting murder against faithful leaders.
🪨 Stoning was the era's method for a capital sentence
📈 Shows the rebellion escalating verse by verse
🔑 Turns from grumbling into an attempt at murder
---
## ✨ The Glory Of The LORD Appeared
This is the same visible manifestation of God's presence that filled the tabernacle in Exodus 40:34 and appeared before Aaron's first offering in Leviticus 9:23 — a direct, unmistakable intervention.
The timing is exact: God interrupts at the precise moment the stoning is about to happen, stopping a murder before it occurs and setting up the confrontation that fills the rest of the chapter.
✨ The same visible presence seen in Exodus 40 and Leviticus 9
⏱️ Appears at the exact moment the stoning is about to happen
🔑 Stops a murder in progress and sets up what follows

# Numbers 14:11-12
# ⚖️ God's First Verdict: How Long Will They Not Believe?
---
## ❓ How Long Will This People Provoke Me
This is a rhetorical question, not a request for an actual number of days. It expresses God's exasperation at a pattern that keeps repeating rather than asking for a literal timeline.
The same phrase — "how long" — will reappear from God again in verse 27, framing this whole episode around a patience finally worn thin.
❓ A rhetorical question, not a literal request for a number
🔁 The same "how long" phrasing returns again in verse 27
🔑 Frames the whole episode around patience finally worn thin
---
## 🎆 All The Signs Which I Have Shewed Among Them
This points to a specific, countable list: the ten plagues, the Red Sea crossing, water from the rock, daily manna, and the fire and cloud guiding them every day and night.
Unbelief after all of that isn't a lack of evidence. It's a refusal to trust evidence that's already overwhelming, which is exactly what makes this moment different from ordinary doubt.
🎆 Points to plagues, the Red Sea, manna, and the guiding cloud
📊 A specific, countable list of witnessed miracles
🔑 This isn't a lack of evidence — it's a refusal to trust it
---
## ☠️ I Will Smite Them With The Pestilence, And Disinherit Them
"Pestilence" means a deadly plague or disease. God's first proposal here is the harshest possible option — wiping out the entire adult generation immediately rather than the slower forty-year sentence that actually follows.
"Disinherit" means to remove someone's right to an inheritance — in this case, cutting this generation off entirely from the promised land they were about to receive.
☠️ "Pestilence" means a deadly plague or disease
📜 "Disinherit" means removing their right to the promised inheritance
🔑 God's harshest possible option — before the milder sentence that follows
---
## 🌳 Make Of Thee A Greater Nation And Mightier Than They
God offers to start over with Moses alone, the same offer made once before, word for word, right after the golden calf in Exodus 32:10.
This is really a test of Moses' character repeating itself. Just like before, Moses turns the offer down and pleads for the people instead of accepting a promotion built on their destruction.
🌳 The identical offer God already made in Exodus 32:10
🔁 A repeated test of Moses' character, not a new idea
🔑 Moses turns it down again, choosing intercession over promotion

# Numbers 14:13-19
# 🕊️ Moses Pleads For Mercy
---
## 🇪🇬 Then The Egyptians Shall Hear It
Moses' first argument isn't about Israel's worthiness at all — it's about God's own reputation. Egypt watched the ten plagues and the Red Sea crossing happen; word of Israel's fate would inevitably reach them.
This is a bold way to pray, reminding God of the stakes His own past actions created. Moses isn't inventing new leverage — he's pointing back to what God Himself already did in plain view of the world.
🇪🇬 The argument centers on God's reputation, not Israel's worth
👀 Egypt already witnessed the plagues and the Red Sea
🔑 Moses points back to what God did in plain view of everyone
---
## 🔥 Thy Cloud Standeth Over Them...Pillar Of Fire By Night
This describes the same visible guidance system established back in Exodus 13:21-22 — a cloud by day and fire by night, marking God's presence for anyone watching, not just Israel.
Moses' point is that surrounding nations already know this detail. God's presence with Israel isn't a private matter; it's been on public display this whole journey.
🔥 The same guidance system first described in Exodus 13:21-22
🌍 A public, visible sign, not a private one
🔑 Surrounding nations already know God is with Israel
---
## 😧 If Thou Shalt Kill All This People As One Man
Moses raises what's actually at stake: sudden, total destruction wouldn't happen quietly. Every nation that has heard about Israel's God would notice and start talking.
This isn't Moses doubting God's power to do it. It's Moses warning about how the act would be understood by everyone watching from the outside.
😧 Warns that sudden destruction wouldn't go unnoticed
📢 Every watching nation would draw their own conclusions
🔑 Not doubting God's power — warning about how it would look
---
## 🗣️ Because The LORD Was Not Able
This is the specific rumor Moses fears: that watching nations would conclude God simply couldn't finish what He started, mistaking judgment for failure.
It's Moses' sharpest argument. He's not asking God to overlook sin — he's asking God to consider how mercy here actually protects God's own name better than destruction would.
🗣️ The exact wrong conclusion outside nations would draw
🎯 Moses' sharpest argument in the whole prayer
🔑 Mercy here protects God's reputation better than judgment would
---
## 🙏 I Beseech Thee
"Beseech" means to beg or plead earnestly — a much more urgent, personal word than a formal request. Moses shifts here from making an argument to simply pleading.
This word appears twice in this short prayer (also in verse 19), marking the emotional center of Moses' intercession, not just its logic.
🙏 "Beseech" means to beg or plead earnestly
🔁 Used twice in this short prayer, marking its emotional center
🔑 A shift from argument to simple, personal pleading
---
## 📜 The LORD Is Longsuffering, And Of Great Mercy
Moses is quoting God's own words back to Him, almost exactly as God revealed His character to Moses in Exodus 34:6-7, right after the golden calf.
"Longsuffering" means patient over a long time, slow to anger even when provoked repeatedly. Moses grounds his whole appeal in who God has already said He is, not in anything new.
📜 Quotes God's own self-description from Exodus 34:6-7
⏳ "Longsuffering" means patient over a long time, slow to anger
🔑 Grounds the appeal in who God already revealed Himself to be
---
## ⚖️ By No Means Clearing The Guilty
This balances the mercy just described. God's forgiveness doesn't erase all consequences — real guilt still carries real weight, even when forgiveness is granted.
This sets up exactly what happens next in the chapter: the nation is pardoned from total destruction, but the adult generation still won't enter the promised land. Mercy and consequence coexist.
⚖️ Balances mercy — forgiveness doesn't erase all consequences
🔮 Sets up the pardon-but-still-consequences pattern coming next
🔑 Shows mercy and consequence can coexist, not cancel each other
---
## 👨‍👩‍👧‍👦 Visiting The Iniquity Of The Fathers Upon The Children
This phrase, also quoted from Exodus 34:7, describes how sin's consequences naturally ripple into the next generations — not that children are personally punished for a parent's specific individual sin.
Here it takes on a literal, immediate meaning: the children of this rebellious generation will indeed grow up wandering the wilderness because of their parents' unbelief, even though they themselves aren't judged for the original sin.
👨‍👩‍👧‍👦 Describes consequences rippling into later generations
🔄 Not personal punishment for someone else's specific sin
🔑 Becomes literal here — children wander because of their parents' choice
---
## 💰 Pardon...According Unto The Greatness Of Thy Mercy
This is Moses' actual, specific request — not a vague hope, but a direct ask grounded entirely in the scale of God's own mercy rather than any merit the people have.
Moses doesn't argue the people deserve forgiveness. He argues God's mercy is great enough to cover even this, which is a very different kind of appeal.
💰 A direct, specific request, not a vague hope
🎯 Grounded in God's mercy, not the people's merit
🔑 A different kind of appeal — not deserving, but trusting mercy's scale
---
## 🔙 As Thou Hast Forgiven This People, From Egypt Even Until Now
This calls back to an entire history of past forgiveness — the golden calf in Exodus 32, and the complaints at Taberah and Kibroth-hattaavah earlier in Numbers 11.
Moses isn't asking for something unprecedented. He's asking God to continue a pattern of mercy that's already been shown again and again since leaving Egypt.
🔙 References a whole history of past forgiveness
🔗 Points back to the golden calf and Numbers 11's complaints
🔑 Asks God to continue an already-established pattern of mercy

# Numbers 14:20-25
# 🚫 Pardoned, Yet Barred From The Land
---
## ✅ I Have Pardoned According To Thy Word
God grants Moses' specific request from verse 19 — the nation as a whole will not be destroyed. Moses' intercession directly changes the outcome that was on the table in verse 12.
This doesn't mean nothing happens as a result of the rebellion. Pardon here means survival, not that the incident is simply forgotten with no further consequence.
✅ Grants Moses' specific request from verse 19
🔄 Directly changes the destruction proposed back in verse 12
🔑 Pardon means survival — not that there's no consequence at all
---
## 🌍 All The Earth Shall Be Filled With The Glory Of The LORD
This is a sweeping promise that reaches far beyond this one moment in the wilderness — God's larger purpose for all creation will still be accomplished no matter what this one generation does.
The prophet Habakkuk later echoes this almost word for word (Habakkuk 2:14), showing this promise stayed alive in Israel's memory for centuries as a hope reaching toward the whole world, not just this crisis.
🌍 A promise reaching far beyond this one wilderness moment
📖 Echoed almost word for word later in Habakkuk 2:14
🔑 God's larger purpose isn't derailed by this one generation's failure
---
## 🔟 Tempted Me Now These Ten Times
This tallies a specific pattern of repeated rebellion across Exodus and Numbers — among them, fear at the Red Sea, the bitter water at Marah, manna-hoarding, Sabbath-breaking, the water complaint at Massah, the golden calf, and the complaints at Taberah and Kibroth-hattaavah, now capped by this spy-report rebellion.
The number matters. This isn't judgment for one bad moment — it's judgment after a long, counted history of the same pattern repeating with no lasting change.
🔟 Tallies a specific, repeated pattern across Exodus and Numbers
📊 Includes the Red Sea, Marah, manna, the golden calf, and more
🔑 Judgment comes after a long pattern, not one bad moment
---
## 🚷 Surely They Shall Not See The Land
Here is the actual sentence, distinct from the destruction God first proposed in verse 12. The adult generation is spared from dying immediately, but still barred from the one thing they were traveling toward this whole time.
Pardon and consequence turn out to be two separate things in this story. Being forgiven doesn't automatically mean getting to keep the promise exactly as first offered.
🚷 The real sentence, distinct from verse 12's proposed destruction
✂️ Spared from dying immediately, but still barred from the goal
🔑 Shows forgiveness and consequence as two separate things
---
## ⭐ My Servant Caleb
"My servant" is a title of honor, used sparingly in Scripture for people in close, trusted relationship with God — the same kind of language later used for Moses himself (Numbers 12:7) and David.
God speaks this title directly and personally, marking Caleb out by name as the clear exception to the coming judgment.
⭐ A rare title of honor for someone in close relationship with God
👑 Later used for Moses and David as well
🔑 Marks Caleb out by name as the clear exception here
---
## 💫 Because He Had Another Spirit With Him
This doesn't describe extra bravery or better information — Caleb saw the same giants and walled cities as everyone else. The difference was internal: a different attitude toward what he saw.
"Another spirit" points to trust and faith, the willingness to let God's promise outweigh visible obstacles, which is exactly what the other ten spies failed to do.
💫 Not extra bravery — Caleb saw the same obstacles as everyone
🎯 Points to trust that let God's promise outweigh what he saw
🔑 The one quality the other ten spies were missing
---
## 🎯 Hath Followed Me Fully
This becomes something like Caleb's permanent label in Scripture — the exact phrase is repeated about him decades later, when he's an old man still asking for his promised inheritance in Joshua 14:8-9.
It's a description of sustained faithfulness over time, not a single good decision. Caleb's whole life, not just this one moment, earns him this description.
🎯 Repeated about Caleb decades later in Joshua 14:8-9
⏳ Describes sustained faithfulness, not a single good decision
🔑 His whole life, not one moment, earns him this title
---
## 🌊 Tomorrow Turn You...By The Way Of The Red Sea
This is God's direct command reversing Israel's direction — instead of advancing north into Canaan, they're sent back south, retracing steps toward the Red Sea region.
This single command marks the literal starting point of the forty years of wandering that will fill the rest of the book of Numbers.
🌊 Reverses Israel's direction, back toward the Red Sea
🔙 Marks the literal start of the forty years of wandering
🔑 One command begins what fills the rest of the book of Numbers

# Numbers 14:26-30
# ⚰️ The Sentence Is Formalized
---
## ⏳ How Long Shall I Bear With This Evil Congregation
This echoes God's own question back in verse 11 almost word for word, showing this isn't a brand new complaint — it's the same patience reaching its final limit.
The repetition itself is the point. God isn't reacting suddenly; this verdict comes after the same pattern named twice in a row within a few verses.
⏳ Echoes God's own question from verse 11 almost exactly
🔁 Shows patience reaching a final limit, not a sudden reaction
🔑 This verdict follows a pattern named twice within a few verses
---
## 😈 This Evil Congregation, Which Murmur Against Me
"Evil congregation" becomes this generation's formal label from this point forward in the chapter — not a passing insult, but the official term for who is being judged.
The complaining that started as grumbling in verse 2 has now been given an official, lasting name attached to the coming sentence.
😈 Becomes the generation's formal label for the rest of the chapter
📛 Not an insult — an official term tied to the coming sentence
🔑 Grumbling in verse 2 now has an official name attached to it
---
## 🗣️ As Ye Have Spoken In Mine Ears, So Will I Do To You
This is a haunting reversal. Back in verse 2, the people said, "would God we had died" — now God takes their own words and turns them into the literal sentence.
It's not that God is being cruel or petty. It shows how seriously words spoken in unbelief are taken — the people asked, in effect, for the wilderness to become their grave, and that's exactly what's granted.
🗣️ Turns the people's own words from verse 2 into the sentence
⚖️ Shows how seriously words spoken in unbelief are taken
🔑 They asked for the wilderness to be their grave — and it is
---
## 💀 Your Carcases Shall Fall In This Wilderness
"Carcases" is a blunt, harsh word for dead bodies, not a softer term like "remains" — the KJV's word choice here is meant to land hard.
This phrase repeats multiple times through the rest of the chapter (also verse 32), functioning almost like a refrain that drives home how final and certain the sentence is.
💀 A blunt, harsh word for dead bodies
🔁 Repeats later in verse 32, functioning like a refrain
🔑 The repetition drives home how final the sentence is
---
## 🎖️ From Twenty Years Old And Upward
This ties directly back to the military census age from Numbers 1:3 — the very men counted there as capable fighting men are the ones excluded here.
It's a pointed irony: the census that once measured the nation's military strength for entering the land now defines exactly who won't get to enter it.
🎖️ Matches the military census age from Numbers 1:3
🔄 The same men counted as fighters are the ones excluded
🔑 A pointed irony — the census now defines who's shut out
---
## 🚫 Doubtless Ye Shall Not Come Into The Land
"Doubtless" removes any ambiguity — this isn't a threat meant to scare them into obedience, it's a settled, certain outcome being announced.
The certainty of the language matches the certainty already shown toward Caleb's inclusion. Both the exclusion and the exception are stated as equally sure.
🚫 "Doubtless" removes any ambiguity about the outcome
🎯 Not a scare tactic — a settled, certain announcement
🔑 Stated with the same certainty as Caleb's exception
---
## 🌟 Save Caleb...And Joshua
This confirms what was already said about Caleb personally in verse 24, and now formally adds Joshua by name to the same exception within the official sentence.
Both men are set apart for the same underlying reason — trust in God's promise instead of fear of what they saw — even though only Caleb's specific reason was spelled out earlier.
🌟 Confirms Caleb's exception from verse 24
➕ Formally adds Joshua's name to the same exception
🔑 Both set apart for trusting God's promise instead of fear

# Numbers 14:31-35
# 👶 Forty Years For Forty Days
---
## 👶 Your Little Ones...Them Will I Bring In
This directly reverses the parents' fear from verse 3, where they worried their children would become prey. Instead, it's precisely these children who receive the promise their parents rejected.
The irony is deliberate. What the older generation feared losing becomes exactly what the next generation gains, because of the parents' own unbelief rather than in spite of it.
👶 Directly reverses the parents' fear from verse 3
🔄 The children inherit what the parents rejected
🔑 What was feared as loss becomes the next generation's gain
---
## 💔 The Land Which Ye Have Despised
"Despised" is a strong word meaning contempt or rejection, not simple caution or fear. It reframes the ten spies' report as more than a mistake — it's treated as an active rejection of God's gift.
This word choice matters for understanding the severity of the judgment. Fear alone might call for correction; despising a gift from God is treated as something far more serious.
💔 "Despised" means contempt or rejection, not just caution
⚖️ Reframes the report as active rejection, not simple fear
🔑 Explains why the judgment is this severe
---
## 💀 But As For You, Your Carcases
This repeats verse 29's sentence almost word for word. Repetition here isn't filler — it's a formal, legal way of making a verdict absolutely certain, a pattern also used later in Leviticus 26's blessings and curses.
Saying it twice within a few verses leaves no room to hope the first mention was somehow negotiable.
💀 Repeats verse 29's sentence almost word for word
📜 A formal way of making a verdict certain, not filler
🔑 Leaves no room to hope the sentence might be negotiable
---
## 🏜️ Wander In The Wilderness Forty Years
This is the first place the length of the sentence is stated explicitly and formally — forty full years, not a vague "a long time."
This single number will define the rest of the book of Numbers and shape an entire generation's life, ending only once every adult from this rebellion has died.
🏜️ The first explicit statement of the sentence's exact length
📖 Shapes the rest of the book of Numbers going forward
🔑 Ends only once this whole rebellious generation has died
---
## 💍 Bear Your Whoredoms
"Whoredoms" is the KJV's word for unfaithfulness, used throughout Scripture as a metaphor for Israel breaking covenant with God — like a spouse's infidelity, not necessarily literal sexual sin here.
The image works because Israel's relationship with God is often pictured as a marriage covenant. Turning to fear and rebellion instead of trust is described the same way Scripture describes turning to another god.
💍 A metaphor for covenant unfaithfulness, not literal sexual sin
🤝 Pictures Israel's relationship with God as a marriage
🔑 Turning to fear here is treated like turning to another god
---
## 📆 Each Day For A Year
This explains the math behind the forty-year sentence directly: the twelve spies spent forty days scouting the land (Numbers 13:25), and each of those days becomes one full year of consequence.
It's a deliberate, exact correspondence, not a round number chosen for effect — the length of the investigation itself determines the length of the punishment.
📆 Explains the exact math: forty scouting days, forty years
🔗 Directly ties back to Numbers 13:25's forty-day mission
🔑 The investigation's length determines the punishment's length
---
## 💔 Ye Shall Know My Breach Of Promise
This striking phrase doesn't mean God breaks His promise to Abraham about the land itself — that promise still stands and will be fulfilled through the next generation.
It means this specific generation will personally experience God withholding what they refused to trust Him for. "Breach" here describes their own experience of loss, not a change in God's underlying character.
💔 Doesn't mean God's promise to Abraham is broken
🎯 Means this generation personally loses what they refused to trust for
🔑 Describes their experience of loss, not God's underlying character
---
## 📢 I The LORD Have Said, I Will Surely Do It
This closing declaration formally seals the judgment, using the strongest possible language of certainty to end this part of God's speech.
It functions like a legal signature on the sentence just pronounced — nothing left ambiguous, nothing left to negotiate further after this point.
📢 Formally seals the judgment with the strongest certainty
✍️ Functions like a legal signature closing the sentence
🔑 Nothing left ambiguous or open to further negotiation

# Numbers 14:36-38
# ☠️ The Ten Spies Die; Caleb And Joshua Live
---
## 😢 Made All The Congregation To Murmur Against Him
This places direct responsibility on the ten spies for triggering the entire rebellion — not merely for giving an inaccurate report, but for actively causing the nation's response to it.
Leadership carries extra weight here. These were trusted tribal leaders (Numbers 13:2-3), which means their words shaped the whole camp's reaction far more than an ordinary person's complaint could.
😢 Places direct responsibility on the ten spies for the rebellion
👑 Their status as trusted leaders gave their words extra weight
🔑 Not just an inaccurate report — an active cause of the uprising
---
## 📰 Bringing Up A Slander Upon The Land
"Slander" confirms the same idea already introduced back in chapter 13:32 as an "evil report" (the Hebrew dibbah) — a false, damaging account, now given its clearest English label.
The word choice makes the moral weight unmistakable. This wasn't simply a discouraging assessment; it was treated as a false, harmful accusation against the land God promised.
📰 Confirms chapter 13:32's "evil report" (dibbah) with a clear label
⚖️ Makes the moral weight of their report unmistakable
🔑 Treated as a false accusation, not just discouraging news
---
## ⚡ Died By The Plague Before The LORD
The ten spies receive swift, individual, immediate judgment — a sharp contrast with the slower forty-year sentence given to the rest of the nation.
This distinction matters. Their leadership role in causing the rebellion made their personal responsibility greater, and their punishment reflects that difference in severity and timing.
⚡ Swift, individual judgment, unlike the nation's slower sentence
📊 Reflects their greater personal responsibility as leaders
🔑 Leadership in causing sin brought a faster, harsher consequence
---
## 🌱 Lived Still
This closes the spy story with a deliberate contrast: the same twelve men were sent, saw the same land, and gave their reports — but only two survive even this immediate judgment.
The chapter pointedly separates Caleb and Joshua's fate from the other ten's, confirming everything already promised about them earlier in this same chapter.
🌱 Closes the story with a deliberate two-versus-ten contrast
🎯 Same mission, same land — only two men's fate is different
🔑 Confirms everything already promised about them earlier

# Numbers 14:39-45
# ⚔️ The Presumptuous Attack And Defeat At Hormah
---
## 😭 The People Mourned Greatly
Grief finally sets in once the sentence is understood as real, final, and personal — not a possibility anymore, but their own future for the rest of their lives.
This mourning comes only after the verdict, not before it, which is worth noticing. The despair in verse 1 was about fear of what might happen; this is grief over what has now actually been decided.
😭 Grief sets in only once the sentence feels final and personal
⏱️ Comes after the verdict, unlike the earlier fear in verse 1
🔑 Grief over what's decided, not fear of what might happen
---
## ⛰️ Gat Them Up Into The Top Of The Mountain
"Gat them up" is an old way of saying "went up." Rather than accepting the sentence, a group suddenly reverses course and tries to march into the land after all, without being told to.
This sudden reversal looks like courage on the surface, but it's actually one more act of disobedience — attempting to fix the consequence by force instead of accepting it.
⛰️ "Gat them up" is an old form of "went up"
🔄 A sudden reversal, attempting the invasion after all
🔑 Looks like courage, but is really more disobedience
---
## 😔 For We Have Sinned
This sounds like repentance on the surface, but the actions that follow reveal it isn't. True repentance would have accepted the wilderness sentence; instead, they try to undo the consequence by force.
This is a common trap — regretting the result of sin isn't the same as submitting to God about it. Wanting the punishment removed is different from actually turning back to trust Him.
😔 Sounds like repentance, but the following actions reveal otherwise
🎭 Regretting a consequence isn't the same as real repentance
🔑 True repentance would accept the sentence, not fight it
---
## 🔄 Wherefore Now Do Ye Transgress The Commandment Of The LORD
Moses points out a sharp irony here: yesterday's sin was refusing to go up into the land when God told them to. Today's sin is going up when God has now told them not to.
Same disobedience, opposite direction — proving the underlying problem was never really about the destination. It was always about refusing to listen to God either way.
🔄 Same disobedience, now pointed the opposite direction
🎯 Yesterday's sin was refusing to go; today's is going anyway
🔑 The real problem was always refusing to listen to God
---
## 🚫 The LORD Is Not Among You
This names the one missing ingredient that made Caleb's earlier confidence in verse 9 legitimate — God's presence going with them into battle.
Without it, none of the courage or numbers matter. The same army that could have won with God's backing in chapter 13-14's earlier moment now marches out with nothing behind it.
🚫 Names the missing ingredient behind Caleb's earlier confidence
⚔️ Without God's presence, courage and numbers don't matter
🔑 The same army, now marching with nothing backing it
---
## 💔 Because Ye Are Turned Away From The LORD
This names the real cause of the coming defeat plainly — not poor tactics or bad luck, but a severed relationship with God going into the battle.
It's a direct explanation, not a guess. Moses states this as established fact before the battle even happens, which is exactly what makes the coming outcome so predictable.
💔 Names the real cause plainly — not tactics, but broken relationship
📢 Stated as fact before the battle even begins
🔑 Makes the coming defeat entirely predictable, not surprising
---
## 😤 They Presumed To Go Up
"Presumed" means acting with arrogant overconfidence, doing something without permission or right — the KJV's own judgment on this whole attempt, stated directly in the text.
It's a strong word choice. This wasn't brave initiative; the text itself labels it as overstepping what they had any right to attempt.
😤 Means acting with arrogant overconfidence, without permission
📖 The text's own direct judgment on the attempt
🔑 Not brave initiative — labeled as overstepping their right
---
## 📦 The Ark Of The Covenant...Departed Not Out Of The Camp
The ark represented God's presence going ahead of Israel into battle, the same role it plays later at the Jordan crossing in Joshua 3 and the fall of Jericho in Joshua 6.
Its absence here is the clearest possible sign that this attack has no divine backing at all — even Moses himself stays behind, refusing to participate in what he knows will fail.
📦 Represents God's presence going ahead into battle
🌊 Plays the same role later in Joshua 3 and Joshua 6
🔑 Its absence is the clearest sign this attack has no backing
---
## 💥 Smote Them, And Discomfited Them
"Discomfited" means routed or thrown into confused, scattered defeat — stronger than simply losing a fight, describing genuine panic and disorder among the attackers.
This outcome matches exactly what Moses warned in verses 42-43. The defeat isn't a surprising twist; it's the predicted, natural result of going without God.
💥 "Discomfited" means routed, scattered in confused defeat
📜 Matches exactly what Moses warned in verses 42-43
🔑 Not a twist — the predictable result of going without God
---
## 🏷️ Even Unto Hormah
"Hormah" means "destruction" in Hebrew, a name tied permanently to this defeat, the same naming pattern already seen with Eshcol in chapter 13:24's grape cluster.
This name gets a second, different chapter later. In Numbers 21:1-3, Israel returns to this same region decades later and this time wins, showing how the same place can carry two very different outcomes depending on whether God goes with them.
🏷️ Means "destruction" in Hebrew, named for this defeat
🔮 The same region returns with a different outcome in Numbers 21:1-3
🔑 One place, two outcomes — depending on whether God goes with them
`;

export const NUMBERS_FOURTEEN_PERSONAL_SECTIONS = parseNumbersFourteenRawNotes(NUMBERS_FOURTEEN_RAW_NOTES);
